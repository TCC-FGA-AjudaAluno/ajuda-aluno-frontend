import styles from './Subjects.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/SubjectsComponents/Top'
import News from '../../components/News'
import Card from '../../components/Card'
import { FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { getAllSubject } from "../../helper/helper"
import {useEffect , useState } from "react";

function  Dashboard() {

   const [age, setAge] = React.useState('');
   const [inputData, setInputData] = React.useState([]);


   const fetchSubject = () => {
      getAllSubject().then(res => {

         setInputData(res.data)
      })
   }

   useEffect(() => {
      fetchSubject()
   }, []);


         
   const handleChange = (event) => {
      setAge(event.target.value);
   };

   

   return (
      <div>
         <Topbar/>

         <section className={styles.container}>
            <div className={`${styles.columnContentPost} ${styles.square}`}>
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
               {
               inputData.map((subject) =>  <Card name={subject.name}  description={subject.description} /> )
               }
             
            </div>

         </section>
         <Footer />
      </div>
   )
}

export default Dashboard
