import styles from './News.module.css'

function News() {
   return (
      <div className={styles.news}>
         <div className={styles.news_content}>
            <img className={styles.img_news} src='/festivities.svg' alt='festivities img'/>
            <p style={{margin: "0px"}}>15 anos de FGA</p>
         </div>
      </div>
   )
}

export default News