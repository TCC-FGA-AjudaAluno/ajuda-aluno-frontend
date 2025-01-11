import * as React from 'react';
import Topbar from '../global/Topbar/Topbar';
import { useParams } from 'react-router-dom';
import styles from './PostPage.module.css'
import Post from '../../components/Post';

function PostPage() {

   var { id } = useParams();
   console.log("id: ", id);

   //funcao para requisitar do backend todos os comentários do post que será exibido nessa tela
   //fetchCommentsFromPost:id

   return (
      <div>
         <Topbar/>
         <h1>PostPage works</h1>
            <div className={styles.post_content}>
               <div style={{width: "50%"}}>
                  <Post name="Fundamento de Arquitetura de Computadores" description="Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque.Nam volutpat, risus a lacinia fringilla, lectus velit rutrum ipsum, vitae varius elit odio a turpis. Etiam non sem sit amet ante euismod mollis eu eget velit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisquemes ac turpis egestas. Vestibulum varius mauris sit amet risus sollicitudin scelerisque..LOOOOOOOOOOOOOOOOOL"/>
               </div>
            </div>
      </div>
      
   )
}

export default PostPage