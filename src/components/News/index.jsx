import styles from './News.module.css'

function News(props) {
   return (
      <div className={styles.card + ' ' + styles.box_down + ' ' + styles.orange}>
            <p style={{margin: "0px"}}><a href={props.href} target="_blank">{props.title}</a></p> 
            <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt=""/> 
            <div className={styles.outline}/>
      </div>
   )
}

export default News