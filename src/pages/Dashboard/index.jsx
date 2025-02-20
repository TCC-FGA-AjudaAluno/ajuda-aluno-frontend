import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Stats from '../../components/Stats'
import News from '../../components/News'
import Card from '../../components/Card'
import { fetchFgaNews } from "../../helper/scraper.js";
import React from 'react'
import { getUser } from "../../helper/helper"
import TaskList from '../../components/TaskList/index.jsx'
import PopChat from '../../components/Chat/index.jsx'

function Dashboard() {
   const [user, setUser] = React.useState({});
   const [age, setAge] = React.useState('');
   const [fgaNews, setFgaNews] = React.useState([]);
   const [reload, setReload] = React.useState(false);

   const updateDashboard = (update) => {
      setReload(true);
   }

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

   const getFgaNews = async () => {
      const result = await fetchFgaNews();
      setFgaNews(result); 
   }
   
   React.useEffect(() => {
      fetchUser();
      getFgaNews();
   }, []);

   return (
      <div style={{overflowX: "hidden"}}>
         <Topbar/>
         <section className={styles.container}>
            <Stats user={user}/>
            <hr style={{width: "35em", border: "0.5px solid gray", margin: "38px 0px 5px 0px"}} />
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <h3 style={{marginBottom: "1.5em"}}>Fga notícias</h3>
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
               <h3 style={{marginBottom: "1.5em"}}>Matérias inscritas</h3>
               { user.subjects?.length > 0 ? user.subjects.map((enroll) => 
                  <Link to={`/subject/${enroll.subject.id}`} style={{ textDecoration: 'none' }}>
                     <Card name={enroll.subject.name} description={enroll.subject.description}/>
                  </Link>
                  ) : <div></div>
               }
            </div>
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Minhas tarefas</h3>

               <div>
                 <PopChat  />
               </div>
               <TaskList updateUser={fetchUser}/>
            </div>
         </section>
         <Footer />
      </div>
   )
}


export default Dashboard

