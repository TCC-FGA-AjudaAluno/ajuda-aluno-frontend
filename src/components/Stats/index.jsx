import React from 'react';
import BarChart from '../BarChart';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getUser } from '../../helper/helper';

function Stats() {

   const [user, setData] = React.useState({});

   const fetchUser = () =>{
      const username = localStorage.getItem('username')
      getUser({username}).then((res) => {
         setData(res.data);
      });
   }

   React.useEffect(() => {
      fetchUser();
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
            <span>90 dias <br/> Fim do semestre</span>
            <span style={{marginLeft: "50px"}}>Pontos:</span>
            <span style={{marginLeft: "10px"}}>{user.points}</span>
         </div>
      </div>
   )
}

export default Stats