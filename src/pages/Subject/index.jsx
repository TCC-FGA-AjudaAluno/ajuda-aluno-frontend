import styles from './Subjects.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/SubjectsComponents/Top'
import News from '../../components/News'
import Card from '../../components/Card'
import React from 'react'

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


function Dashboard() {

   const [age, setAge] = React.useState('');

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   return (
      <div>
         <Topbar/>
         <div className={styles.top}>
               <Stats/>
            </div>
         <section className={styles.container}>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <h3>Materiais</h3>
               <div className={styles.news_content}>
                  <News/>
               </div>
               <div className={styles.news_content}>
                  <News/>
               </div>
               <div className={styles.news_content}>
                  <News/>
               </div>
               <div className={styles.news_content}>
                  <News/>
               </div>
            </div>
            <div className={`${styles.columnContentPost} ${styles.square}`}>
               <h3>Posts</h3>
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
               <Card name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque."/>
               <Card name="Programação para Sistemas Distribuidos" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque."/>
               <Card name="Projeto Integrador 1" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.."/>
               <Card name="Banco de Dados 1" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.."/>
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

export default Dashboard
