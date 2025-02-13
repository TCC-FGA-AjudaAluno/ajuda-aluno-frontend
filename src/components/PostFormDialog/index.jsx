import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { createPost } from "../../helper/helper"

function PostFormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen} style={{bottom: "5em", float: 'right', marginRight: "1rem"}}>
        Nova postagem
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            console.log('subjectId: ', props.subjectId);
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            createPost(formJson.title, formJson.content, props.subjectId).then(res => {
              console.log("res.data getPost: ", res.data);
              if(res.data){
                props.updatePosts();
              }
           });
            handleClose();
          },
        }}
      >
        <DialogTitle>Criar nova postagem</DialogTitle>
        <DialogContent>
         <DialogContentText>
            Preencha as informações necessárias para criação da postagem:
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
            id="content"
            name="content"
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
          <Button type="submit">Postar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default PostFormDialog;