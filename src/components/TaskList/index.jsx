import * as React from 'react';
import styles from './TaskList.module.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, TextField } from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { IconButton } from "@mui/material"
import { createUserTasks, getUserTasks, updateTask } from '../../helper/helper';



function TaskList(props) {

   //console.log(props.tasks)

   const [tasks, setTasks] = React.useState([]);
   const [tasksDone, setTasksDone] = React.useState([]);
   const [tasksUndone, setTasksUndone] = React.useState([]);
   const [status, setStatus] = React.useState(false);
   const [updatePage, setUpdatePage] = React.useState(false);
   const [open, setOpen] = React.useState(false);      
      
   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };
   
   const fetchUserTasks = () => {
      getUserTasks().then((res) => {
         if(res.data){
            setTasks(res.data);
         }
      });
   }

   const updateTaskDone = (taskId) => {
      console.log('taskId: ', taskId);
      updateTask(taskId).then((res) => {
         if(res.status === 200){
            setUpdatePage(true);
         }
      });
   }

   const handleTasksFilter = (event) => {
      setStatus(event.target.value);
      if(event.target.value === false){
         setTasksUndone(filterUserTasks(tasks, event.target.value));
      }else{
         setTasksDone(filterUserTasks(tasks, event.target.value));
      }
   }

   const filterUserTasks = (tasks, status) => {
      console.log("status: ", status);
      console.log("tasks: ", tasks);

      return tasks.filter((task) => task.done === status);
   }

   React.useEffect(() => {
      fetchUserTasks();
   }, [updatePage]);

   React.useEffect(() => {
      setTasksUndone(filterUserTasks(tasks, false));
   }, [tasks]);

   
      return (
         <div>
            <div style={{width: "100%", paddingLeft: "24em"}}>
               <React.Fragment>
                  <Button variant='contained' onClick={handleClickOpen} style={{margin: "1em 0em 0em 1em"}}>
                     Nova tarefa
                  </Button>
                  <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                     component: 'form',
                     onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        
                        createUserTasks({ title: formJson.title, description: formJson.description }).then(res => {
                        console.log("res.data createUserTasks: ", res.data);
                        if(res.data){
                           fetchUserTasks();
                        }
                     });
                        handleClose();
                     },
                  }}
                  >
                  <DialogTitle>Criar nova tarefa</DialogTitle>
                  <DialogContent>
                     <DialogContentText>
                        Preencha as informações necessárias para criação da uma nova tarefa:
                     </DialogContentText>
                     <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Título"
                        type="text"
                        fullWidth
                        variant="outlined"
                     />
                     <TextField
                        autoFocus="false"
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Descrição"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}
                     />
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleClose}>Cancelar</Button>
                     <Button type="submit">Criar</Button>
                  </DialogActions>
                  </Dialog>
               </React.Fragment> 
            </div>
            <FormControl sx={{ m: 1}}>
               <Select
                  sx={{height: 30, borderRadius: 20}}
                  className={styles.selectSemester}
                  value={status}
                  displayEmpty
                  onChange={handleTasksFilter}
               >
                  <MenuItem disabled value="">
                     <em>Status</em>
                  </MenuItem>
                  <MenuItem value={false}>Em progresso</MenuItem>
                  <MenuItem value={true}>Finalizadas</MenuItem>
               </Select>
            </FormControl>
            { status ? tasksDone.map((task) => 
               <div className={!task.done ? `${styles.card} + ${styles.yellow}` : `${styles.card} + ${styles.green}`}>
                  <div>
                     <div className={styles.card_title}>
                        <div style={{width: '100%'}}>
                           <p style={{marginBottom: '0em', wordBreak: 'break-word', marginLeft: '2em'}}>{task.title}</p>  
                        </div>
                     </div>
                  </div>
                  <div className={styles.card_description}>
                     <p style={{margin: "0px", minHeight: "5vh", padding: "1em"}}>{task.description}</p>
                  </div>
               </div>   
               ) :
               tasksUndone.map((task) => 
                  <div className={!task.done ? `${styles.card} + ${styles.yellow}` : `${styles.card} + ${styles.green}`}>
                     <div>
                        <div className={styles.card_title}>
                           <div style={{width: '100%'}}>
                              <p style={{marginBottom: '0em', wordBreak: 'break-word', marginLeft: '2em'}}>{task.title}</p>  
                           </div>
                           <div>
                              { task.done ? <div></div> :
                              <IconButton style={{cursor: 'pointer', color: 'green'}} type="button" onClick={() => {
                                 updateTaskDone(task.id);
                              }}>
                                 <CheckOutlinedIcon/>
                              </IconButton>       
                              }       
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