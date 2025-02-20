import { useEffect, useState } from "react";
import { getPosts } from "../../services/posts";
import { getSubjectPosts } from "../../helper/helper";
import Post from "../Post";
import PostFormDialog from "../PostFormDialog";
import styles from "./PostList.module.css"


export function PostList({subjectId}) {
   const [posts, setPosts] = useState([]);

   const fetchPosts = () => {
      getSubjectPosts(subjectId).then(res => {
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
      <div style={{marginTop: "2vh"}}>
         <PostFormDialog subjectId={subjectId} updatePosts={fetchPosts}/>
         <div>
            { posts.length > 0 ? posts.map((post) => 
               <Post post={post} updatePosts={fetchPosts}/>
               ) : <div></div>
            }
         </div>
      </div>
   )
   
}