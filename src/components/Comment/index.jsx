import styles from './Comment.module.css'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
   dateStyle: "medium",
   timeStyle: "short"
})

export function Comment ({ id, message, user, createdAt }) {
   return <>
      <div className={styles.comment}>
         <div className={styles.header}>
            <span className={styles.name}>
               {user.name}
            </span>
            <span className={styles.date}>
               {dateFormatter.format(Date.parse(createdAt))}
            </span>
         </div>
         <div className={styles.message}>{ message }</div>
      </div>
   </>
}