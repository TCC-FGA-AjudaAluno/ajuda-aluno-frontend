import React from 'react';
import styles from './SearchResultsList.module.css';
import SearchResult from '../SearchResult';

function SearchResultsList(props){
   return (
      <div className={props.isVisible ? styles.resultsList : styles.hide}>
         {
            props.results.map((result, id) => {
               return <SearchResult result={ result } key={id}/>
            })
         }
      </div>
   )
}

export default SearchResultsList