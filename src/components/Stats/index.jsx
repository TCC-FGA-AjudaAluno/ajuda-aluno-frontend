import React from 'react';
import BarChart from '../BarChart';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { getUser } from '../../helper/helper';
import { fetchSemesterDuration } from "../../helper/scraper.js";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";

function Stats(props) {

   const [semesterDays, setSemesterDays] = React.useState(0);

   const fetchSemesterLenght = async () => {
      const days = await fetchSemesterDuration();
      setSemesterDays(days);
   }

   React.useEffect(() => {
      fetchSemesterLenght();
   }, []);

   return (
      <div style={{display: "grid"}}>
         <div style={{
            display: "flex", 
            width: "100%", 
            alignItems: "center", 
            margin: "38px 0px 26px 18px"
         }}>
            <img
               alt="profile-user"
               width="46px"
               height="46px"
               src={require(`../../assets/user2.png`)}
               style={{cursor: "pointer", borderRadius: "50%"}}
            />
            <span style={{marginLeft: "20px"}}> {props.user ? props.user.name : ""} </span>
         </div>
         {/*
            <div style={{height: "200px", marginBottom:"25px"}}>
               <BarChart/>
            </div>
         */}
         <div style={{display: "flex", alignItems: "center", marginLeft: "18px"}}>
            <CalendarMonthOutlinedIcon style={{width: "38px", height: "35px", marginRight: "9px"}}/>
            <span>
               <Odometer style={{marginRight: ".2em"}} format="d" duration={1000} value={semesterDays} />
               dias 
               <br/> 
               Fim do semestre
            </span>
            <span style={{marginLeft: "50px"}}>Pontos:</span>
            <span style={{marginLeft: "10px"}}>{props.user ? <Odometer value={props.user.points} /> : ""}</span>
         </div>
      </div>
   )
}

export default Stats