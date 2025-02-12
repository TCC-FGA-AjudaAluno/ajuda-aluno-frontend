import { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";
import { getSubjectPosts } from "../../helper/helper";
import Post from "../Post";


export function PostList({subjectId}) {
   const [posts, setPosts] = useState([]);

   const fetchPosts = () => {
      getSubjectPosts(subjectId).then(res => {
         console.log("res.data getSubjectPosts: ", res.data);
         if (res.data && res.data.length > 0) {
            setPosts(res.data);
         }else{
            setPosts([]);
         }
      });
   }


   useEffect(() => {
      fetchPosts();
   }, [subjectId])

   return (
      <div>
         { posts.length > 0 ? posts.map((post) => 
            <Post id={post.id} name={post.title} description={post.content} totalComments={post.comments}/>
            ) : <div></div>
         }
      </div>
   )
   
}