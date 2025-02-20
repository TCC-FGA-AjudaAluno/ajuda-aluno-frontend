import * as React from 'react';
import Topbar from '../global/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import styles from './PostPage.module.css'
import { CommentList } from '../../components/CommentList';
import Footer from '../../components/Footer';
import { createPostComment, getPost, Toast } from '../../helper/helper';

function PostPage() {

   const [post, setPost] = React.useState({});
   const [comments, setComments] = React.useState([]);
   const [message, setMessage] = React.useState("");
   const [loading, setLoading] = React.useState(false);

   var { id } = useParams();

   const dateFormatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
   })
   
   const onCommentCreate = (e) => {
      e.preventDefault();
      setLoading(true);
      createPostComment({ content: message, postId: post.id }).then(res => {
         if(res.data){
            Toast.fire({
               icon: "success",
               title: "Você ganhou +3 pontos!!"
             });
            fetchPost();
         }
      });
   }
   
   const fetchPost = async () => {
      getPost(id).then(res => {
         setPost(res.data);
         setComments(res.data.comments);
         setLoading(false);
         setMessage("");
      });
   }
 
   React.useEffect(() => {
      fetchPost();
   }, [])

   return (
      <div>
         <Topbar/>
         <div className={styles.post_section}>
            <h2>{post ? post.title : "Carregando..."}</h2>
            <div style={{display: "flex", flexDirection: "column", color: "hsl(235, 50%, 67%)"}}>
               <span>{post.author ? post.author.name : "Carregando..."}</span>
               <span>{post.createdAt ? dateFormatter.format(Date.parse(post.createdAt)) : "Carregando..."}</span>
            </div>
            <div className={styles.post_content}>
               <span>
                  {post.content}
               </span>
            </div>
         </div>
         <div className={styles.comments_section}>
            <h3 className={styles.comments_title}>Comentários:</h3>
            <section>
               <form onSubmit={onCommentCreate}>
                  <div className={styles.comment_form_row}>
                     <textarea
                        autoFocus={false}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        className={styles.message_input}
                     />
                     <button className={styles.btn} type="submit" disabled={loading}>
                        {loading ? "Enviando" : "Enviar"}
                     </button>
                  </div>
               </form>
               <div className={styles.comment_container}>
                     <CommentList comments={ comments ?? []} updatePostPage={fetchPost}/>
               </div>
            </section>
         </div>
         <Footer/>
      </div>
   )
}

export default PostPage