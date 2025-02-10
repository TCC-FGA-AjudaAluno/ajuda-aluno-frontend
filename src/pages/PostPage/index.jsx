import * as React from 'react';
import Topbar from '../global/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import styles from './PostPage.module.css'
import { CommentList } from '../../components/CommentList';
import { CommentForm } from '../../components/CommentForm';
import { useAsyncFn } from '../../hooks/fetch.hook';
import { createComment } from '../../services/comment';
import { usePost } from '../../context/PostContext';
import Footer from '../../components/Footer';
import { getPost } from '../../helper/helper';

const commentsMock = {
   comments:
   [
      {
         id: 1,
         message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus consectetur quis aliquid veritatis dolor explicabo nihil, neque, expedita corporis hic non voluptas? Velit placeat error vel tempore, aspernatur quia! Omnis.",
         user: {
            name: "Matt Murdock"
         },
         createdAt: "Wed, 09 Aug 2014 00:00:00 GMT"
      },
      {
         id: 2,
         message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus consectetur quis aliquid veritatis dolor explicabo nihil, neque, expedita corporis hic non voluptas? Velit placeat error vel tempore, aspernatur quia! Omnis.",
         user: {
            name: "Anthony Edward Stark"
         },
         createdAt: "Fri, 18 Jan 2018 00:00:00 GMT"
      },
      {
         id: 3,
         message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus consectetur quis aliquid veritatis dolor explicabo nihil, neque, expedita corporis hic non voluptas? Velit placeat error vel tempore, aspernatur quia! Omnis.",
         user: {
            name: "Steven Rogers"
         },
         createdAt: "Mon, 23 Apr 2024 00:00:00 GMT"
      }
   ]
}


function PostPage() {

   //const { post, comments, createLocalComment } = usePost();
   //const { loading, error, execute: createCommentFn } = useAsyncFn(createComment);

   const [post, setPost] = React.useState({});

   var { id } = useParams();
   console.log("id: ", id);

   const dateFormatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short"
   })
   
   function onCommentCreate(message){
      console.log("apertou enviar");
      /*
      return createCommentFn({ postId: post.id, message }).then(
         createLocalComment
      )
      */
   }
   
   const fetchPost = async () => {
      console.log("entrou no fetchPost");
      getPost(id).then(res => {
         console.log("res.data getPost: ", res.data);
         setPost(res.data);
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
               <CommentForm
                  loading={false}
                  error={false}
                  onSubmit={onCommentCreate}
               />
               <div className={styles.comment_container}>
                     <CommentList comments={ post.comments ? post.comments : []}/>
                  </div>
               </section>
            </div>
         <Footer/>
      </div>
   )
}

export default PostPage