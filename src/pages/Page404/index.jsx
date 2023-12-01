import Container from "../../components/Container"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from "./Page404.module.css"

function Page404() {
   return (
      <>
         <Header path=""/>
         <Container>
            <h2 className={styles.title2}>OOPS!</h2>
            <div className={styles.texts}>
               <span className={styles.big_text}>404</span> <br />
               <strong className={styles.red_text}>Não foi possivel localizar a página que você está procurando.</strong>
            </div>
         </Container>
         <Footer />
         
      </>
   )
}

export default Page404