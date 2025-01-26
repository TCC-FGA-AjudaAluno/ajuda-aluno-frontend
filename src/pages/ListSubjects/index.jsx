import styles from './Subjects.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Card from '../../components/Card'
import React from 'react'
import { getAllSubject } from "../../helper/helper"
import {useEffect , useState } from "react";

function  ListSubjects() {

   const [inputData, setInputData] = React.useState([]);


   const fetchSubject = () => {
      getAllSubject().then(res => {

         setInputData(res.data)
      })
   }

   useEffect(() => {
      console.log("rendering page");
      fetchSubject();
   }, []);
  
   return (
      <div>
         <Topbar/>
         <section className={styles.container}>
            <div className={`${styles.columnContentPost} ${styles.square}`}>
               <h1>Matérias</h1>
               {inputData.map((subject) =>  
                     <div className={styles.card}>
                        <Card name={subject.name}  description={subject.description} /> 
                     </div>
                  )
               } 
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default ListSubjects
