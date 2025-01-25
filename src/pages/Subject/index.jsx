import styles from './Subject.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/SubjectsComponents/Top'
import News from '../../components/News'
import Card from '../../components/Card'
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
import Post from '../../components/Post';
import PostFormDialog from '../../components/PostFormDialog';



function Subject() {

   const [age, setAge] = React.useState('');
   const initialState = "Inscrever-se"; // checar se o usuário está inscrito ou não para setar valor inicial
   const [buttonText, setButtonText] = React.useState(initialState);

   //Criar funcao que faz requisicao pro back de todos os posts da matéria com id x

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   const handleSubscribe = () => {
      //rota de inscrição ou desinscrição (a depender do estado atual) em matéria para o back-end aqui;
      // -> /subscribeSubject/:subjectId ou /unsubscribeSubject/:subjectId
      setButtonText("Desinscrever"); // muda texto butao depois de se inscrever com sucesso
   };

   /*
   useEffect(() => { 
      if(buttonText !== initialState){
        setTimeout(() => setButtonText(initialState), [1000])
      }
    }, [buttonText])
   */

   return (
      <div>
         <Topbar/>
         <div className={styles.subject_name}>
            <p> Requisitos </p>
         </div>
         <div className={styles.subscribe_btn}>
            <button type='button' className={`${styles.btn} ${styles.btn_blue}`} onClick={() => handleSubscribe()}>
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
                  <div className={styles.post_btn}>
                     <PostFormDialog/>
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
               <Post name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque"/>
               <Post name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque"/>
               <Post name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque"/>
               <Post name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque"/>
               {/* <PostList/> */}
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

export default Subject
