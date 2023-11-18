
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Subjects from "./pages/Subjects"
import Page404 from "./pages/Page404"


function AppRoutes() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={ <Home />}></Route>
            <Route path="/home" element={ <Dashboard />}></Route>
            <Route path="/subject" element={ <Subjects />}></Route>
            <Route path="*" element={ <Page404 />}></Route>
         </Routes>
      </BrowserRouter>
   )
}

export default AppRoutes