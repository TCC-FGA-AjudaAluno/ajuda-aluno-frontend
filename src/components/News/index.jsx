import styles from './News.module.css'

function News(props) {
   return (
      <div className={styles.news}>
         <div className={styles.news_content}>
            <img className={styles.img_news} src='/festivities.svg' alt='festivities img'/>
            <p style={{margin: "0px"}}><a href={props.href} target="_blank">{props.title}</a>
</p>
         </div>
      </div>
   )
}

export default News