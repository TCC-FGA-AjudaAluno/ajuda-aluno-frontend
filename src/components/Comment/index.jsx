import { Button } from '@mui/material'
import { BiLike } from "react-icons/bi";
import styles from './Comment.module.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
   dateStyle: "medium",
   timeStyle: "short"
})

export function Comment ({ id, content, author, createdAt }) {
   return <>
      <div className={styles.comment}>
         <div className={styles.header}>
            <span className={styles.name}>
               {author.name}
            </span>
            <span className={styles.date}>
               {dateFormatter.format(Date.parse(createdAt))}
            </span>
         </div>
         <div className={styles.message}>{ content }</div>
         <div>
            <Button onClick={()=> console.log("liked comment")} style={{backgroundColor: 'white', color: '#1976d2'}}>
               <span className={styles.comment_btnIcons}>
                  <span style={{margin: "5px 5px 0px 0px"}}>
                     <BiLike />
                  </span>
                  <span>
                     implementar quantidade
                  </span>
               </span>
            </Button>
         </div>
      </div>
   </>
}