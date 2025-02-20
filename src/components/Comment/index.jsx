import { Button } from '@mui/material'
import { BiLike } from "react-icons/bi";
import styles from './Comment.module.css'
import { downvoteComment, Toast, upvoteComment } from '../../helper/helper';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
   dateStyle: "medium",
   timeStyle: "short"
})

export function Comment (props) {
   const handleLikeClick = () => {
      if(props.comment.vote === null || props.comment.vote === "DOWNVOTE"){
         upvoteComment(props.comment.id).then((res) => {
            if(res.data){
               Toast.fire({
                  icon: "success",
                  title: "Você ganhou +1 ponto!!"
               });
               props.updatePostPage();
            } 
         });
      }else{
         downvoteComment(props.comment.id).then((res) => {
            if(res.data){
               props.updatePostPage();
            } 
         });
      }
   };

   return <>
      <div className={styles.comment}>
         <div className={styles.header}>
            <span className={styles.name}>
               {props.comment.author.name}
            </span>
            <span className={styles.date}>
               {dateFormatter.format(Date.parse(props.comment.createdAt))}
            </span>
         </div>
         <div className={styles.message}>{ props.comment.content }</div>
         <div>
            <Button onClick={handleLikeClick} style={props.comment.vote === "UPVOTE" ? { color: "#28a745" } : { color: "#1976d2"}}>
               <span className={styles.comment_btnIcons}>
                  <span style={{margin: "5px 5px 0px 0px"}}>
                     <BiLike />
                  </span>
                  <span>
                     {props.comment.upvotes}
                  </span>
               </span>
            </Button>
         </div>
      </div>
   </>
}