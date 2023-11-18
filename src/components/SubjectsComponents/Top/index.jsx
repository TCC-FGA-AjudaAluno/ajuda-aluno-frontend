import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import styles from './Top.module.css'

function Stats() {
   return (
      <div style={{display: "grid"}}>
         <div className={styles.subject}>
            <p > Requisitos </p>
         </div>
         <div style={{height: "200px", marginBottom:"25px"}}>
         </div>
         <div style={{display: "flex", alignItems: "center", marginLeft: "28px"}}>
            <CalendarMonthOutlinedIcon style={{width: "38px", height: "35px", marginRight: "9px"}}/>
            <span>90 dias <br/> Fim do semestre</span>
         </div>
      </div>
   )
}

export default Stats