import { useState } from "react";
import styles from "./CommentForm.module.css";

export function CommentForm({
   loading,
   error,
   onSubmit,
   autoFocus = false,
   initialValue = ""
}) {
   const [message, setMessage] = useState(initialValue)

function handleSubmit(e) {
   e.preventDefault();
   onSubmit(message).then(() => setMessage(""));
}

   return (
      <form onSubmit={handleSubmit}>
         <div className={styles.comment_form_row}>
            <textarea
               autoFocus={autoFocus}
               value={message}
               onChange={e => setMessage(e.target.value)}
               className={styles.message_input}
            />
            <button className={styles.btn} type="submit" disabled={loading}>
               {loading ? "Enviando" : "Enviar"}
            </button>
         </div>
         <div className={styles.error_msg}>{error}</div>
      </form>
   )
}