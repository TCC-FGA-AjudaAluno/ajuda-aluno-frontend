import styles from './Subject.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import React from 'react'
import MaterialTable from '../../components/UploadFile'
import DownloadFile from '../../components/DownloadFile'

import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop, popupOpen } from '@syncfusion/ej2-react-schedule';
import { FormControl, MenuItem, Select } from '@mui/material'
import { useParams } from 'react-router-dom'
import { createSubjectEvents, enroll, getSubject, getSubjectEvents, getUser, unenroll } from '../../helper/helper'
import { PostList } from '../../components/PostList'



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

   var data = [];

   const fieldsData = {
      id: 'id',
      subject: { name: 'title', title: 'Título', placeholder: "Adicione um título"},
      location: { name: 'location', title: 'Local'},
      description: { name: 'description', title: 'Descrição'},
      startTime: { name: 'start', title: 'Início' },
      endTime: { name: 'end', title: 'Fim' },
      allDay: false
  }

   const saveEventMoreDetails = 'e-schedule-dialog e-control e-btn e-lib e-primary e-event-save e-flat';
   const closePopup = (args) => {
      const classNameSave = args.event?.target.className;

      if (classNameSave === saveEventMoreDetails){
         console.log("clicou pra salvar evento modal detalhada");
         console.log("args.data: ", args.data);
         //chama rota POST de salvar monitoria e depois atualiza a página (setLoading(false))
         createSubjectEvents({...args.data, subjectId: id}).then((res) => {
            if (res.data){
               setLoading(false);
            }
         });
      }
   }

   function onPopupOpen(args) {
      const newAppointment = "e-work-cells e-work-days e-selected-cell";
      if (args.type === "QuickInfo" && args.target.className === newAppointment) {
         console.log("caiu quick info:", args.target.className);
         args.cancel = true; // Prevent the default quick popup
         scheduleObj.current.openEditor(args.data, "Add"); // Directly open the detailed editor
         
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
                  <h3>Materiais</h3>
                  <MaterialTable/>
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
                     <ScheduleComponent ref={scheduleObj} popupOpen={onPopupOpen.bind(this)} popupClose={closePopup} width='100%' height='650px' currentView='Month' eventSettings={{ dataSource: subjectEvents, fields: fieldsData }}>
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
