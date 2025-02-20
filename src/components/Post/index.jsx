import * as React from 'react';
import { BiLike } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import styles from './Post.module.css'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { downvotePost, upvotePost } from '../../helper/helper';

function Post(props) {
   console.log("Post props: ", props);
 
  const handleLikeClick = () => {
      if(props.post.vote === null || props.post.vote === "DOWNVOTE"){
         upvotePost(props.post.id).then((res) => {
            if(res.data){
               props.updatePosts();
            } 
         });
      }else{
         downvotePost(props.post.id).then((res) => {
            if(res.data){
               props.updatePosts();
            } 
         });
      }
  };

   return (
      <div className={styles.post_card}> 
         <div className={styles.card + ' ' + styles.box_down + ' ' + styles.blue}> 
            <Link to={`/post/${props.post.id}`} style={{ textDecoration: 'none' }}>
               <div className={styles.card_title}>
                  <p style={{margin: "0px 5px 0px 0px", cursor: "pointer"}}>{props.post.title}</p>   
               </div>
               <div className={styles.card_description}>
                  <p className={styles.post_text}>{props.post.content}</p>
               </div>
            </Link>
            <div style={{marginLeft: "1.5em"}}>
               <Button onClick={handleLikeClick} style={props.post.vote === "UPVOTE" ? { color: "#28a745" } : { color: "#1976d2"}}>
                  <span className={styles.comment_btnIcons}>
                     <span style={{margin: "5px 5px 0px 0px"}}>
                        <BiLike />
                     </span>
                     <span>
                        {props.post.upvotes}
                     </span>
                  </span>
               </Button>
               <Link to={`/post/${props.post.id}`} style={{ textDecoration: 'none' }}>
                  <Button>
                     <span className={styles.comment_btnIcons}>
                        <span style={{margin: "5px 5px 0px 0px"}}>
                           <BsChat />
                        </span>
                        <span>
                           {props.post.comments}
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