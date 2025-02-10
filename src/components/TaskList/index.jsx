import * as React from 'react';

import styles from './TaskList.module.css'


function TaskList() {

   const [tasks, setTasks] = React.useState([]);

   const tasksList = [
      {
         title: "Tarefa 1",
         description: "Minha primeira tarefa FGA"
      },
      {
         title: "Tarefa 2",
         description: "Minha segunda tarefa FGA"
      },
      {
         title: "Tarefa 3",
         description: "Minha terceira tarefa FGA"
      }
   ]

   React.useEffect(() => {
      console.log("rendering list tasks");
      setTasks(tasksList)
   }, []);

   return (
      <div>
         {tasks.map((task) => 
            <div className={styles.card + ' ' + styles.box_down + ' ' + styles.blue}>
               <div className={styles.card_title}>
                  <p style={{margin: "0px 5px 0px 0px"}}>{task.title}</p>   
               </div>
               <div className={styles.card_description}>
                  <p style={{margin: "0px", minHeight: "95px"}}>{task.description}</p>
               </div>
            </div>   
         )
         }
      </div>
   )
   
}

export default TaskList