import * as React from 'react';
import { BsChat } from "react-icons/bs";
import styles from './Post.module.css'
import { Link } from 'react-router-dom';

function Post(props) {
   return (
      <Link to={`/post/${props.id}`} style={{ textDecoration: 'none' }}>
         <div className={styles.post_card}>
            <div className={styles.card + ' ' + styles.box_down + ' ' + styles.blue}> 
               <div className={styles.card_title}>
                  <p style={{margin: "0px 5px 0px 0px", cursor: "pointer"}}>{props.name}</p>   
               </div>
               <div className={styles.card_description}>
                  <p className={styles.post_text}>{props.description}</p>
               </div>
               <a className={styles.comment_btn}>
                  <span className={styles.comment_btnIcons}>
                     <span style={{margin: "5px 5px 0px 0px"}}>
                        <BsChat />
                     </span>
                     <span>
                        {props.comments}
                     </span>
                  </span>
               </a>
            </div>
         </div>
      </Link>
   )
}

export default Post