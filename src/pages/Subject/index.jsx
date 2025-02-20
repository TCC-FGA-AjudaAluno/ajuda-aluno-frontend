import styles from './Subject.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import React, { useState } from 'react'
import MaterialTable from '../../components/UploadFile'
import DownloadFile from '../../components/DownloadFile'
import { CgAddR } from "react-icons/cg";


import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, popupOpen, actionBegin } from '@syncfusion/ej2-react-schedule';
import { FormControl, MenuItem, Select } from '@mui/material'
import { useParams } from 'react-router-dom'
import { createSubjectEvents, enroll, getSubject, getSubjectEvents, getUser, unenroll } from '../../helper/helper'
import { PostList } from '../../components/PostList'
import Swal from 'sweetalert2'



function Subject() {
   
   var { id } = useParams();
   console.log("Subject id:", id);
  
   const [subject, setSubject] = React.useState({});
   const [user, setUser] = React.useState({});
   const [buttonText, setButtonText] = React.useState(undefined);
   const [subscribed, setSubscribed] = React.useState(undefined);
   const [loading, setLoading] = React.useState(true);
   const [subjectEvents, setSubjectEvents] = React.useState([]);
   const scheduleObj = React.useRef(null);
   const [isOpen, setIsOpen] = useState(false);

   const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });


   const togglePop = () => {
      setIsOpen(!isOpen);
    };


   var data = [];

   const fieldsData = {
      id: 'id',
      subject: { name: 'title', title: 'Título', default: ''},
      location: { name: 'location', title: 'Local'},
      description: { name: 'description', title: 'Descrição'},
      startTime: { name: 'start', title: 'Início' },
      endTime: { name: 'end', title: 'Fim'},
      allDay: false
  }

   const onActionBegin = (args) => {
    console.log("args:", args);
      
      if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
         console.log("caiu no if 1 validacao");
        if (!args.data[0].location || args.data[0].location.trim() === '') {
          console.log("caiu no if 2 validacao");
          args.cancel = true; 
          Toast.fire({
            icon: "error",
            title: "Insira as informações do local da monitoria!"
          });
        }
        else if (args.data[0].title.trim() === 'Add title') {
         args.cancel = true; 
         Toast.fire({
           icon: "error",
           title: "Insira o título da monitoria!"
         });
       }else{
         createSubjectEvents({event: args.data[0], subjectId: id}).then((res) => {
            if (res.data){
               setLoading(false);
            }
         });
       }
      }
    };

   function onPopupOpen(args) {
      const appointment = "e-appointment e-lib e-draggable e-appointment-border";
        
      if ((args.type === "QuickInfo") && (args.target.className !== appointment)) {
         console.log("caiu quick info:", args.target.className);
         args.cancel = true; 
         scheduleObj.current.openEditor(args.data, "Add"); 
      }
      
      if (args.type === 'Editor') {
         if (!args.element.querySelector('.custom-field-row')) {
            args.element.querySelector('.e-title-text').textContent = "Novo evento";
            document.querySelector(".e-editor").style.display = "none";
            args.element.querySelectorAll('.e-time-icon')[1].classList.remove('e-icon-disable'); 
            args.element.querySelectorAll('.e-time-icon')[0].classList.remove('e-icon-disable'); 
            args.element.querySelector('.e-time-zone-container').classList.remove('e-disable'); 
            args.element.querySelector('.e-start').ej2_instances[0].format = "M/d/yy h:mm a"; 
            args.element.querySelector('.e-end').ej2_instances[0].format = "M/d/yy h:mm a"; 
            args.element.querySelector('.e-start').ej2_instances[0].value.setHours(9, 0, 0); 
            args.element.querySelector('.e-end').ej2_instances[0].value.setHours(9, 30, 0); 
            args.element.querySelector('.e-start').ej2_instances[0].dataBind(); 
            args.element.querySelector('.e-all-day.e-checkbox').ej2_instances[0].checked = false;
            args.element.querySelector('.e-all-day-time-zone-row').style.display = "none";
         }
      }

   }

   const handleSubscribe = () => {
      if(subscribed === true){
         unenroll({subjectId: subject.id}).then((res) => {
            if(res.status === 204){
               setSubscribed(false);
               setButtonText("Inscrever");
            }
         });
      }else{
         enroll({userId: user.id, subjectId: subject.id}).then((res) => {
            if(res.data){
               setSubscribed(true)
               setButtonText("Desinscrever");
            }
         });
      }
   };

   const fetchSubjectEvents = () => {
      getSubjectEvents(id).then((res) => {
         if(res.data){
            res.data.map((event) => {
               data.push(event);
            });
            setSubjectEvents(data);
            setLoading(false);
         }
      });
   }

   const fetchSubject = async () => {
      getSubject(id).then((res) => {
         setSubject(res.data);
         fetchUser();
      });
   }

   const fetchUser = async () =>{
      getUser({
         id : JSON.parse(localStorage.getItem('user')).id,
         token : localStorage.getItem('token')
      }).then((res) => {
         setUser(res.data);
         verifySubscription();
      });
   }

   const verifySubscription = () => {
      console.log('user dentro da tela de Subject: ', user);
      console.log('Subject: ', subject);
      
      if(user.subjects?.length > 0 && user.subjects.filter((enroll) => {
         return enroll.subject.id === subject.id
      }).length) {
         setSubscribed(true);
         setButtonText("Desinscrever");
      }else{
         setSubscribed(false);
         setButtonText("Inscrever");
      }
      fetchSubjectEvents();
   }

   React.useEffect(() => { 
      console.log("renderizou matéria");
      fetchSubject();
    }, [id, loading])

   if (!loading){
      return (
         <div style={{overflow: "hidden", width: "100vw", height: "100vh"}}>
            <Topbar/>
            <div className={styles.subject_name}>
               <p> {subject.name} </p>
            </div>
            <div>
               <button type='button' className={!subscribed ? `${styles.btn} ${styles.btn_blue}` : `${styles.btn} ${styles.btn_red}`} onClick={() => handleSubscribe()}>
                  {buttonText}
               </button>
            </div>
            <section className={styles.container}>
               <div className={`${styles.columnContent} ${styles.rect}`}>
                  <h3 style={{ 
                       marginLeft  : "18px" 
                     , paddingBottom: "1vw"
                     }}> Materiais   
                  < CgAddR onClick={togglePop} style={{ 
                      color: "#4378b0" 
                     , marginTop: "5px"
                     , float: "right"
                     , marginRight  : "2vw" 
                     , color: "whitesmok"
                     , border: "none"
                     , cursor: "pointer"
                     }} /> 
                  </h3>
               {isOpen && (

                  <MaterialTable />
               )}
                  <DownloadFile/>
               </div>
               <div className={`${styles.columnContentPost} ${styles.square}`}>
                  <div>
                     <div>
                        <h3>Posts</h3>
                     </div>
                  </div>
                  <PostList subjectId={subject.id}/>
               </div>
               <div className={`${styles.columnContentMonitoria} ${styles.square}`}>
                  <h3>Monitoria</h3>
                  <div className ={`${styles.schedule} `}> 
                     <ScheduleComponent ref={scheduleObj} popupOpen={onPopupOpen} width='100%' height='650px' currentView='Month' eventSettings={{ dataSource: subjectEvents, fields: fieldsData }} actionBegin={onActionBegin}>
                        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}/>
                     </ScheduleComponent>
                  </div>
               </div>
            </section>
            <Footer />
         </div>
      )
   }

}

export default Subject
