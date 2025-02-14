import styles from './Dashboard.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/Stats'
import News from '../../components/News'
import Card from '../../components/Card'
import { FormControl, MenuItem, Select } from '@mui/material'
import { fetchFgaNews } from "../../helper/scraper.js";
import React from 'react'
import { getSubjectByUser, getUser } from "../../helper/helper"
import TaskList from '../../components/TaskList/index.jsx'
import { use } from 'react'
import { Link } from 'react-router-dom'


function Dashboard() {
   const [user, setUser] = React.useState({});
   const [age, setAge] = React.useState('');
   const [taskStatus, setTaskStatus] = React.useState('in_progress');
   const [fgaNews, setFgaNews] = React.useState([]);

   const fetchUser = async () =>{
      getUser({
         id : JSON.parse(localStorage.getItem('user')).id,
         token : localStorage.getItem('token')
      }).then((res) => {
         localStorage.setItem('user', JSON.stringify(res.data));
         setUser(res.data);
      });
   }

   const handleChange = (event) => {
      setAge(event.target.value);
   };

   const handleTasksFilter = (event) => {
      setTaskStatus(event.target.value);
   }


   const getFgaNews = async () => {
      console.log("getFgaNews",);
      const result = await fetchFgaNews();
      setFgaNews(result); 
   }
   
   React.useEffect(() => {
      fetchUser();
      console.log('user: ', user);
      getFgaNews();
   }, []);

   return (
      <div>
         <Topbar/>
         <section className={styles.container}>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <Stats user={user}/>
            </div>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <h3 style={{marginBottom: "3.3em"}}>Fga notícias</h3>
               <div className={styles.news_content}>
                  { fgaNews.length > 0 ? <News href={fgaNews[0].href} title={fgaNews[0].title}/> : null }
               </div>
               <div className={styles.news_content}>
                  { fgaNews.length > 0 ? <News href={fgaNews[1].href} title={fgaNews[1].title}/> : null }
               </div>
               <div className={styles.news_content}>
                  { fgaNews.length > 0 ? <News href={fgaNews[2].href} title={fgaNews[2].title}/> : null }
               </div>
               <div className={styles.news_content}>
                  { fgaNews.length > 0 ? <News href={fgaNews[3].href} title={fgaNews[3].title}/> : null }
               </div>
            </div>
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Matérias inscritas</h3>
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
               { user.subjects?.length > 0 ? user.subjects.map((enroll) => 
                  <Link to={`/subject/${enroll.subject.id}`} style={{ textDecoration: 'none' }}>
                     <Card name={enroll.subject.name} description={enroll.subject.description}/>
                  </Link>
                  ) : <div></div>
               }
            </div>
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Minhas tarefas</h3>
               <FormControl sx={{ m: 1, minWidth: 120}}>
                  <Select
                     sx={{height: 30, borderRadius: 20}}
                     className={styles.selectSemester}
                     value={taskStatus}
                     displayEmpty
                     onChange={handleTasksFilter}
                  >
                     <MenuItem value={"in_progress"}>Em execução</MenuItem>
                     <MenuItem value={"done"}>Finalizadas</MenuItem>
                  </Select>
               </FormControl>
              <TaskList/>
              <div>
              <PopChat messages={msgs} getMessage={getMessage} />
              </div>
              
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default Dashboard
