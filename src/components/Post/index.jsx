import * as React from 'react';
import { BiLike } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

function Post(props) {

   const [color, setColor] = React.useState("transparent");
   const [textColor, setTextColor] = React.useState("#1976d2");

  const handleLikeClick = () => {
    setColor(color === "transparent" ? "#1976d2" : "transparent");
    setTextColor(textColor === "#1976d2" ? "white" : "#1976d2");
  };

   return (
         <div className={styles.post_card}> 
            <div className={styles.card + ' ' + styles.box_down + ' ' + styles.blue}> 
               <Link to={`/post/${props.id}`} style={{ textDecoration: 'none' }}>
                  <div className={styles.card_title}>
                     <p style={{margin: "0px 5px 0px 0px", cursor: "pointer"}}>{props.name}</p>   
                  </div>
                  <div className={styles.card_description}>
                     <p className={styles.post_text}>{props.description}</p>
                  </div>
               </Link>
               <div style={{marginLeft: "1.5em"}}>
                  <Button onClick={handleLikeClick} style={{backgroundColor: color, color: textColor}}>
                     <span className={styles.comment_btnIcons}>
                        <span style={{margin: "5px 5px 0px 0px"}}>
                           <BiLike />
                        </span>
                        <span>
                           {props.comments}
                        </span>
                     </span>
                  </Button>
                  <Link to={`/post/${props.id}`} style={{ textDecoration: 'none' }}>
                     <Button>
                        <span className={styles.comment_btnIcons}>
                           <span style={{margin: "5px 5px 0px 0px"}}>
                              <BsChat />
                           </span>
                           <span>
                              {props.comments}
                           </span>
                        </span>
                     </Button>
                  </Link>
               </div>
            </div>
         </div>
   )
}

export default Post