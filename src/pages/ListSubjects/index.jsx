import styles from './Subjects.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Card from '../../components/Card'
import React from 'react'
import { getAllSubject } from "../../helper/helper"
import {useEffect , useState } from "react";
import { Link } from 'react-router-dom'

function  ListSubjects() {

   const [inputData, setInputData] = React.useState([]);


   const fetchSubject = () => {
      getAllSubject().then(res => {
         console.log("res subjects: ", res.data);
         if(res.data && res.data.length > 0) {
            setInputData(res.data.filter((subject, index) => {
               return index > 0 && index > 1
            }))
         }else{
            setInputData([]);
         }
      })
   }

   useEffect(() => {
      fetchSubject();
   }, []);
  
   return (
      <div>
         <Topbar/>
         <section className={styles.container}>
            <div className={`${styles.columnContentPost} ${styles.square}`}>
               <h1>Matérias</h1>
               {inputData.length > 0 ? inputData.map((subject) =>  
                     <div className={styles.card}>
                        <Link to={`/subject/${subject.id}`} style={{ textDecoration: 'none' }}>
                           <Card name={subject.name}  description={subject.description} /> 
                        </Link>
                     </div>
                  ) : <div> </div>
               } 
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default ListSubjects
