import * as React from 'react';
import { useParams } from "react-router-dom";
import { getPosts } from '../services/posts';
import { useAsync } from '../hooks/fetch.hook';


const Context = React.createContext();

export function usePost() {
   return React.useContext(Context);
}

export function PostProvider({ children }) {
   
   const { id } = useParams();
   const { loading, error, value: post } = useAsync(() => getPosts(id), [id]);
   const [comments, setComments] = React.useState([]);

   React.useEffect(() => {
      if (post?.comments == null) return
      setComments(post.comments)
   }, [post?.comments]);

   function createLocalComment(comment) {
      setComments(prevComments => {
         return [comment, ...prevComments]
      })
   }

   function updateLocalComment(id, message) {
      setComments(prevComments => {
         return prevComments.map(comment => {
            if(comment.id === id) {
               return { ...comment, message }
            } else {
               return comment
            }
         })
      })
   }

   function deleteLocalComment(id) {
      setComments(prevComments => {
         return prevComments.filter(comment => comment.id !== id)
      })
   }

   return (
      <Context.Provider
         value={{
            post: { id, ...post },
            comments,
            createLocalComment,
            updateLocalComment,
            deleteLocalComment
         }}
      >
         { loading ? (
            <h1>Enviando</h1>
         ) : error ? (
            <h1 style={{color: "red"}}>{error}</h1>
         ) : (
            children
         )}
      </Context.Provider>
   )
}