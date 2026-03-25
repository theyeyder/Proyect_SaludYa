
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "../modules/auth/Login";
import RegistrarPaciente from "../modules/admision/RegistrarPaciente";

export default function AppRoutes(){
 return(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/admision" element={<RegistrarPaciente/>}/>
    </Routes>
  </BrowserRouter>
 )
}
