import styles from './Subject.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import React from 'react'
import MaterialTable from '../../components/UploadFile'

import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { FormControl, MenuItem, Select } from '@mui/material'
import { useParams } from 'react-router-dom'
import { getSubject, getUser } from '../../helper/helper'
import { PostList } from '../../components/PostList'



function Subject() {

   var { id } = useParams();
   console.log("Subject id: ", id);
  
   const [subject, setSubject] = React.useState({});
   const [user, setUser] = React.useState({});
   const [age, setAge] = React.useState('');
   const [buttonText, setButtonText] = React.useState(undefined);
   const [subscribed, setSubscribed] = React.useState(undefined);
   const [loading, setLoading] = React.useState(true);

   //Criar funcao que faz requisicao pro back de todos os posts da matéria com id x

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   const handleSubscribe = () => {
      console.log("clicou botao inscrever: ", subscribed);
      if(subscribed == true){
         //chama rota de desinscrever: DELETE unenroll (/subjects/:subjectId/enroll)
         setSubscribed(false);
         setButtonText("Inscrever");
      }else{
         //chama rota de inscrever: POST enroll (/subjects/enroll)
         setSubscribed(true)
         setButtonText("Desinscrever");
      }
   };

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
      setLoading(false);
   }

   React.useEffect(() => { 
      console.log("renderizou matéria");
      fetchSubject();
    }, [id, loading])

   if (!loading){
      return (
         <div style={{overflow: "scroll"}}>
            <Topbar/>
            <div className={styles.subject_name}>
               <p> {subject.name} </p>
            </div>
            <div className={styles.subscribe_btn}>
               <button type='button' className={!subscribed ? `${styles.btn} ${styles.btn_blue}` : `${styles.btn} ${styles.btn_red}`} onClick={() => handleSubscribe()}>
                  {buttonText}
               </button>
            </div>
            <section className={styles.container}>
               <div className={`${styles.columnContent} ${styles.rect}`}>
                  <h3>Materiais</h3>
                  <MaterialTable/>
               </div>
               <div className={`${styles.columnContentPost} ${styles.square}`}>
                  <div>
                     <div>
                        <h3>Posts</h3>
                     </div>
                  </div>
                  <FormControl sx={{ m: 1, minWidth: 120}}>
                     <Select
                        sx={{height: 30, borderRadius: 20}}
                        className={styles.selectSemester}
                        value={age}
                        displayEmpty
                        onChange={handleChange}
                     >
                        <MenuItem value="">
                           Semestre atual
                        </MenuItem>
                        <MenuItem value={10}>1°/2023</MenuItem>
                        <MenuItem value={20}>2°/2022</MenuItem>
                        <MenuItem value={30}>1°/2022</MenuItem>
                     </Select>
                  </FormControl>
                  <PostList subjectId={subject.id}/>
               </div>
               <div className={`${styles.columnContentMonitoria} ${styles.square}`}>
                  <h3>Monitoria</h3>
                  <div className ={`${styles.schedule} `}> <ScheduleComponent width='100%' height='650px' currentView='Month' eventSettings={{ 
                     fields: {
                     id: 'id',
                     subject: { name: 'subject' },
                     isAllDay: { name: 'isallday' },
                     location: { name: 'location' },
                     description: { name: 'description' },
                     startTime: { name: 'starttime' },
                     endTime: { name: 'endtime' },
                     startTimezone: { name: 'starttimezone' },
                     endTimezone: { name: 'endtimezone' },
                     recurrenceID: {name:'recurrenceid'},
                     recurrenceRule:{name:'recurrencerule'},
                     recurrenceException: {name:'recurrenceexception'},
                     followingID:{name:'followingid'}
                     } }}>
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
