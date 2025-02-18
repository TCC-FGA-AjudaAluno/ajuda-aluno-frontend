import * as React from 'react';

import { IconButton } from '@mui/material';
import styles from './Card.module.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Card(props) {

   const [anchorEl, setAnchorEl] = React.useState(null);

   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
   const handleClose = () => {
     setAnchorEl(null);
   };

   return (
      <div className={styles.card + ' ' + styles.box_down + ' ' + styles.blue}>
         {/*
         <div className={styles.card_btn}>
            <IconButton onClick={handleClick} type="button">
            <MoreHorizIcon/>
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
               <MenuItem onClick={handleClose}>Adicionar matéria</MenuItem>
               <MenuItem onClick={handleClose}>Descrição</MenuItem>
               <MenuItem  onClick={handleClose}>Logout</MenuItem>
            </Menu> 
         </div>  
         */}
         <div className={styles.card_title}>
            <p style={{margin: "0px 5px 0px 0px", cursor: "pointer"}}>{props.name}</p>   
         </div>
         <div className={styles.card_description}>
            <p style={{margin: "0px", minHeight: "8vw"}}>{props.description}</p>
         </div>
         <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt=""/>
         <div className={styles.outline}/>
      </div>
   )
}

export default Card