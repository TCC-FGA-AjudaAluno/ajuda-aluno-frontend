import Container from "../../components/Container"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import styles from "./Page404.module.css"
import React from "react";

function Page404() {

   const [username, setUsername] = React.useState("");

   const getSessionUser = () =>{
      setUsername(localStorage.getItem('username'));
   }

   React.useEffect(() => {
      getSessionUser();
   }, []);

   return (
      <>
         <Header path={username ? "home" : ""}/>
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