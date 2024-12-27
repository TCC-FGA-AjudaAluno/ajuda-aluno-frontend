import styles from './Dashboard.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/Stats'
import News from '../../components/News'
import Card from '../../components/Card'
import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { getSubjectByUser } from "../../helper/helper"


function Dashboard() {

   const [age, setAge] = React.useState('');

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   const fetchUser = () =>{
      const username = localStorage.getItem('username')
      const subjects = getSubjectByUser(username);

      
   }

   React.useEffect(() => {
      fetchUser();
   }, []);

   return (
      <div>
         <Topbar/>
         <section className={styles.container}>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <Stats/>
            </div>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <h3>Fga Informações</h3>
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
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Matérias</h3>
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
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3 style={{marginBottom: "110px"}}>Minhas tarefas</h3>
               <Card name="Requisitos" description="É a tentativa de se expressar visualmente dados ou valores numéricos de maneira diferenciada."/>
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default Dashboard
