import styles from './Dashboard.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'
import Chart from '../../components/Chart'

function Dashboard() {
   return (
      <div>
         <Topbar/>
         <section className={styles.container}>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <Chart/>
            </div>
            <div className={`${styles.columnContent} ${styles.rect}`}>
               <h3>Componente 2</h3>
            </div>
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Componente 3</h3>
            </div>
            <div className={`${styles.columnContent} ${styles.square}`}>
               <h3>Componente 4</h3>
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default Dashboard
