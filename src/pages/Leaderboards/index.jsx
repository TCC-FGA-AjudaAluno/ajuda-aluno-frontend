import Topbar from "../global/Topbar/Topbar";
import StickyHeadTable from "../../components/Table";
import Footer from "../../components/Footer";

function Leaderboards() {
   return (
      <>
         <Topbar/>
         <h1>Tabela de pontuação</h1>
         <StickyHeadTable/>
         <Footer/>
      </>
   )
}

export default Leaderboards