import * as React from 'react';
import Topbar from '../global/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import styles from './PostPage.module.css'
import Post from '../../components/Post';
import { CommentList } from '../../components/CommentList';
import { CommentForm } from '../../components/CommentForm';
import { useAsyncFn } from '../../hooks/fetch.hook';
import { createComment } from '../../services/comment';
import { usePost } from '../../context/PostContext';
import Footer from '../../components/Footer';

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

   var { id } = useParams();
   console.log("id: ", id);

   
   function onCommentCreate(message){
      console.log("apertou enviar");
      /*
      return createCommentFn({ postId: post.id, message }).then(
         createLocalComment
      )
      */
   }
   
   //const { post } = usePost(id);
   //funcao para requisitar do backend todos os comentários do post que será exibido nessa tela
   //fetchCommentsFromPost:id

   return (
      <>
         <Topbar/>
            <div className={styles.post_content}>
               <div className={styles.post_body}>
                  <h1 className={styles.post_title}>Título postagem teste</h1>
                  <article>
                  Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus 
                  et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non 
                  sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac 
                  turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris 
                  sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes 
                  ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris 
                  sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris 
                  sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque
                  </article>
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
                     <CommentList comments={commentsMock.comments}/>
                  </div>
               </section>
            </div>
         <Footer/>
      </>
   )
}

export default PostPage