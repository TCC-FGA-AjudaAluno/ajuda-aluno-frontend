import * as React from 'react';
import styles from './Topbar.module.css'
import { Box, IconButton, InputBase } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link , useNavigate  } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import SearchResultsList from '../../../components/SearchResultsList';
import { getAllSubject } from '../../../helper/helper';

function Topbar() {
   const navigate = useNavigate()

 // logout handler function
   function userLogout(){
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      navigate('/');
   }
   
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [input, setInput] = React.useState("");
   const [results, setResults] = React.useState([]);

   const [isVisible, setIsVisible] = React.useState(true);
   const newRef = React.useRef(null);

   React.useEffect(() => {
      document.addEventListener("mousedown", handleOutsideClick);
      return () => {
         document.removeEventListener("mousedown", handleOutsideClick);
      };
   });

   const handleOutsideClick = (e) => {
      if (newRef.current && !newRef.current.contains(e.target)) {
        setIsVisible(false);
      }else{
         setIsVisible(true);
      }
   };

   const open = Boolean(anchorEl);
   const fetchData = (value) => {
      getAllSubject()
         .then((response) => response.data)
         .then((json) => {
            setResults(json.filter((subject) => {
               return value && 
                      subject && 
                      subject.name && 
                      subject.name.toLowerCase().includes(value.toLowerCase())
            }));
            console.log(results);
         });
   }
   const handleChange = (value) => {
      setInput(value);
      fetchData(value);
   }
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
               <Link to="/subjects" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Materias</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Progresso</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>FAQ</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Configurações</Link>
               <Link to="/leaderboards" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Placar de pontuação</Link>
            </nav>
            <Box 
               ref={newRef}
               className={styles.searchbar}
            >
               <div style={{marginRight: "87px"}}>
                  <IconButton  type="button">
                     <SearchOutlinedIcon className={styles.searchIcon}/>
                  </IconButton>
                  <InputBase 
                     sx={{ flex: 1}} placeholder="Procurar matéria..." 
                     value={input} 
                     onChange={(e) => handleChange(e.target.value)}>
                  </InputBase>
               </div>
               <SearchResultsList results={results} isVisible={isVisible} />
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