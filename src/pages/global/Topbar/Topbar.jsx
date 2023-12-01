import * as React from 'react';
import styles from './Topbar.module.css'
import { Box, IconButton, InputBase } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link , useNavigate  } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Topbar() {
   const navigate = useNavigate()

 // logout handler function
   function userLogout(){
   localStorage.removeItem('token');
   navigate('/');
   }
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
     setAnchorEl(null);
   };


   return (
      <div style={{border: "1px", boxShadow: "0px 4px 4px #000000"}}>
         <Box className={styles.topbar}>
            <nav style={{marginLeft: "75px"}}>
               <Link to="/home" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Home</Link>
               <Link to="/materias" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Materias</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Progresso</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>FAQ</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Configurações</Link>
               <Link to="/leaderboards" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Placar de pontuação</Link>
            </nav>
            <Box 
               className={styles.searchbar}
            >
               <div style={{marginRight: "87px"}}>
                  <IconButton  type="button">
                     <SearchOutlinedIcon className={styles.searchIcon}/>
                  </IconButton>
                  <InputBase  sx={{ flex: 1}} placeholder="Procurar matéria...">
                  </InputBase>
               </div>
               <div>
                  <IconButton onClick={handleClick} type="button">
                  <AccountCircleIcon style={{fontSize: "32px"}}/>
                   </IconButton>
                   <Menu
                     id="basic-menu"
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     MenuListProps={{
                        'aria-labelledby': 'basic-button',
                     }}
                     >
                     <MenuItem onClick={handleClose}>Profile</MenuItem>
                     <MenuItem onClick={handleClose}>My account</MenuItem>
                     <MenuItem  onClick={userLogout}>Logout</MenuItem>
                     </Menu>

                     
               </div>
            </Box>
         </Box>
      </div>
   )
}

export default Topbar