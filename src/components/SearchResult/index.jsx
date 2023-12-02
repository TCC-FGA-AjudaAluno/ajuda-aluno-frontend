import React from 'react';
import styles from './SearchResult.module.css';

function SearchResult({ result }){
   
   return (
      <div 
         className={styles.searchResult} 
         onClick={(e) => alert(`You clicked on ${result.name}`)}
      >
         { result.name }
      </div>
   )
}

export default SearchResult