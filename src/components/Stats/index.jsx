import React from 'react';
import BarChart from '../BarChart';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getUser } from '../../helper/helper';
import { fetchSemesterDuration } from "../../helper/scraper.js";

function Stats() {

   const [user, setData] = React.useState({});
   const [semesterDays, setSemesterDays] = React.useState(0);

   const fetchUser = () =>{
      const user = JSON.parse(localStorage.getItem('user'));

      console.log('userRRR: ', user);
      getUser({
         id : user.id,
         token : localStorage.getItem('token')
      }).then((res) => {
         setData(res.data);
      });
   }

   const fetchSemesterLenght = async () => {
      const days = await fetchSemesterDuration();
      setSemesterDays(days);
   }

   React.useEffect(() => {
      fetchUser();
      fetchSemesterLenght();
   }, []);

   return (
      <div style={{display: "grid"}}>
         <div style={{
            display: "flex", 
            width: "100%", 
            alignItems: "center", 
            margin: "38px 0px 26px 85px"
         }}>
            <img
               alt="profile-user"
               width="46px"
               height="46px"
               src={require(`../../assets/user.png`)}
               style={{cursor: "pointer", borderRadius: "50%"}}
            />
            <span style={{marginLeft: "20px"}}> {user.username} </span>
         </div>
         <div style={{height: "200px", marginBottom:"25px"}}>
            <BarChart/>
         </div>
         <div style={{display: "flex", alignItems: "center", marginLeft: "28px"}}>
            <CalendarMonthOutlinedIcon style={{width: "38px", height: "35px", marginRight: "9px"}}/>
            <span>{semesterDays} dias <br/> Fim do semestre</span>
            <span style={{marginLeft: "50px"}}>Pontos:</span>
            <span style={{marginLeft: "10px"}}>{user.points}</span>
         </div>
      </div>
   )
}

export default Stats