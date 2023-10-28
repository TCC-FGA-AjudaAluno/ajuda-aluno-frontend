import './Dashboard.module.css'
import Footer from "../../components/Footer"
import Topbar from '../global/Topbar/Topbar'

function Dashboard() {
   return (
      <div>
         <Topbar/>
         <section className='container'>
            <div className='apresentacao'>
            </div>
         </section>
         <Footer />
      </div>
   )
}

export default Dashboard
