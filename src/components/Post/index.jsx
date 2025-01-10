import * as React from 'react';
import { BsChat } from "react-icons/bs";
import styles from './Post.module.css'

function Post(props) {

   return (
      <a className={styles.post_card}>
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
                     17
                  </span>
               </span>
            </a>
         </div>
      </a>
   )
}

export default Post