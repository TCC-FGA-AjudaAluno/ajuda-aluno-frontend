import { IconButton } from '@mui/material';
import styles from './Card.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function Card(props) {
   return (
      <div className={styles.card}>
         <div className={styles.card_title}>
            <p style={{margin: "0px 5px 0px 0px", cursor: "pointer"}}>{props.name}</p>
            <IconButton sx={{p: 0, marginLeft: 44}} type="button">
               <MoreHorizIcon/>
            </IconButton>
         </div>
         <div className={styles.card_description}>
            <p style={{margin: "0px", minHeight: "95px"}}>{props.description}</p>
         </div>
         <div className={styles.outline}/>
      </div>
   )
}

export default Card