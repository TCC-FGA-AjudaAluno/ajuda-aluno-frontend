import React from 'react';
import styles from './SearchResult.module.css';
import { useNavigate } from 'react-router-dom';

function SearchResult({ result }){
   const navigate = useNavigate();

   const handleClick = (event) => {
      navigate(`/subject/${result.id}`);
    };
   
   return (
      <div 
         className={styles.searchResult} 
         onClick={handleClick}
      >
         { result.name }
      </div>
   )
}

export default SearchResult