import styles from "./CommentList.module.css"
import { Comment } from "../Comment";

export function CommentList({ comments }) {
   console.log("comments: ", comments);
   return comments.map(comment => (
      <div key={comment.id} className={styles.comment_stack}>
         <Comment {...comment} />
      </div>
   ))
}