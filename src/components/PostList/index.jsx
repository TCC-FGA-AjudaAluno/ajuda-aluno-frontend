import { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";


export function PostList() {
   const [posts, setPosts] = useState([]);
   useEffect(() => {
      //descomentar quando a requisição pro back funcionar
      //getPosts().then(setPosts);
   }, [])

   return posts.map(post => {
      return (
         <h1 key={post.id}>
            <a href={`/post/${post.id}`}>{post.title}</a>
         </h1>
      )
   })
}