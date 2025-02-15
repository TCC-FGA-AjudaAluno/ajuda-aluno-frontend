import * as React from 'react';
import styles from './TaskList.module.css'
import { Button, FormControl, MenuItem, Select } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton } from "@mui/material"



function TaskList(props) {

   //console.log(props.tasks)

   const [tasks, setTasks] = React.useState([]);
   const [taskStatus, setTaskStatus] = React.useState('in_progress');

   //Mock de uma lista de tarefas
   const tasksList = [
      {
         title: "Tarefaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 1",
         description: "Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA Minha primeira tarefa FGA",
         status: "in_progress"
      },
      {
         title: "Tarefa 2",
         description: "Minha segunda tarefa FGA",
         status: "in_progress"
      },
      {
         title: "Tarefa 3",
         description: "Minha terceira tarefa FGA",
         status: "in_progress"
      },
      {
         title: "Tarefa 4",
         description: "Minha quarta tarefa FGA",
         status: "done"
      },
      {
         title: "Tarefa 5",
         description: "Minha quinta tarefa FGA",
         status: "done"
      }
   ]

   const handleTasksFilter = (event) => {
      setTaskStatus(event.target.value);
      console.log("event.target.value: ", event.target.value);
      setTasks(filterUserTasks(tasksList, event.target.value));
   }

   const filterUserTasks = (tasks, status) => {
      console.log("tasks: ", tasks);
      //console.log("status: ", status);
      return tasks.filter((task) => task.status == status);
   }

   React.useEffect(() => {
      setTasks(filterUserTasks(tasksList, taskStatus));
   }, []);

   return (
      <div>
         <FormControl sx={{ m: 1, minWidth: 120}}>
            <Select
               sx={{height: 30, borderRadius: 20}}
               className={styles.selectSemester}
               value={taskStatus}
               displayEmpty
               onChange={handleTasksFilter}
            >
               <MenuItem value={"in_progress"}>Em execução</MenuItem>
               <MenuItem value={"done"}>Finalizadas</MenuItem>
            </Select>
         </FormControl>
         {tasks.map((task) => 
            <div className={taskStatus === 'in_progress' ? `${styles.card} + ${styles.yellow}` : `${styles.card} + ${styles.green}`}>
               <div>
                  <div className={styles.card_title}>
                     <div style={{width: '100%'}}>
                        <p style={{marginBottom: '0em', wordBreak: 'break-word', marginLeft: '2em'}}>{task.title}</p>  
                     </div>
                     <div>
                        <IconButton style={{cursor: 'pointer', color: 'red'}} type="button">
                           <DeleteForeverOutlinedIcon/>
                        </IconButton>              
                     </div>
                  </div>
               </div>
               <div className={styles.card_description}>
                  <p style={{margin: "0px", minHeight: "5vh", padding: "1em"}}>{task.description}</p>
               </div>
            </div>   
         )
         }
      </div>
   )
   
}

export default TaskList