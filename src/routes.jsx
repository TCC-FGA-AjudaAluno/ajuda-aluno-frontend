
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AddSubjects from "./pages/AddSubjects"
import Dashboard from "./pages/Dashboard"
import Reset from "./pages/Reset"
import Subject from "./pages/Subject"
import Subjects from "./pages/ListSubjects"
import Leaderboards from "./pages/Leaderboards"
import Page404 from "./pages/Page404"

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth.js'

function AppRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <Home />}></Route>
            <Route path="/home" element={<AuthorizeUser> <Dashboard /> </AuthorizeUser>}> </Route>
            <Route path="/AddSubjects" element={<AuthorizeUser> <Dashboard /> </AuthorizeUser>}> </Route>
            <Route path="/Reset" element={ <Reset /> }> </Route>
            <Route path="/subject" element={ <AuthorizeUser> <Subject /> </AuthorizeUser>}></Route>
            <Route path="/subjects" element={ <AuthorizeUser> <Subjects /> </AuthorizeUser>}></Route>
            <Route path="*" element={ <Page404 />}></Route>
            <Route path="/leaderboards" element={ <Leaderboards/> }></Route>
         </Routes>
      </BrowserRouter>
   )
}

export default AppRoutes