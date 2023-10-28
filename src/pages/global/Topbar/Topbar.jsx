import styles from './Topbar.module.css'
import { Box, IconButton, InputBase } from "@mui/material"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';


function Topbar() {
   return (
      <div style={{border: "1px", boxShadow: "0px 4px 4px #000000"}}>
         <Box className={styles.topbar}>
            {/* Search Bar */}
            <nav style={{marginLeft: "75px"}}>
               <Link to="/dashboard" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Home</Link>
               <Link to="/materias" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Materias</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Progresso</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>FAQ</Link>
               <Link to="/progresso" style={{marginRight: "30px", textDecoration: "none", color:"#000000", fontSize: "12px"}}>Configurações</Link>
            </nav>
            <Box 
               className={styles.searchbar}
            >
               <div style={{marginRight: "87px"}}>
                  <IconButton type="button">
                     <SearchOutlinedIcon className={styles.searchIcon}/>
                  </IconButton>
                  <InputBase  sx={{ flex: 1}} placeholder="Procurar matéria...">
                  </InputBase>
               </div>
               <div>
                  <IconButton  type="button">
                     <AccountCircleIcon style={{fontSize: "32px"}}/>
                  </IconButton>
               </div>
            </Box>
         </Box>
      </div>
   )
}

export default Topbar