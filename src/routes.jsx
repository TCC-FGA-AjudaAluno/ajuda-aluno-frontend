
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Reset from "./pages/Reset"
import Subjects from "./pages/Subjects"
import Page404 from "./pages/Page404"

/** auth middleware */
import { AuthorizeUser, ProtectRoute } from './middleware/auth.js'

function AppRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <Home />}></Route>
            <Route path="/home" element={<AuthorizeUser> <Dashboard /> </AuthorizeUser>}> </Route>
            <Route path="/Reset" element={ <Reset /> }> </Route>
            <Route path="/subject" element={ <AuthorizeUser> <Subjects /> </AuthorizeUser>}></Route>
            <Route path="*" element={ <Page404 />}></Route>
         </Routes>
      </BrowserRouter>
   )
}

export default AppRoutes