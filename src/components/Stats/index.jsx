import BarChart from '../BarChart';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

function Stats() {
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
            <span style={{marginLeft: "20px"}}> User Name </span>
         </div>
         <div style={{height: "200px", marginBottom:"25px"}}>
            <BarChart/>
         </div>
         <div style={{display: "flex", alignItems: "center", marginLeft: "28px"}}>
            <CalendarMonthOutlinedIcon style={{width: "38px", height: "35px", marginRight: "9px"}}/>
            <span>90 dias <br/> Fim do semestre</span>
         </div>
      </div>
   )
}

export default Stats