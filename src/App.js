import {
    BrowserRouter,
    Routes,
    Route,
    
  } from "react-router-dom";
  import React  from 'react';
  import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/sign-up/Signup";
import ContactForm from "./pages/contactForm/ContactForm";
import Aggrid from "./pages/aggrid/Aggrid";
 /* import  Liste  from "./pages/liste/Liste";
  import Ticket from "./pages/ticket/Ticket";
  import Logout from "./pages/logout/Logout";
  import Login from "./pages/login/Login";
  import Signup from "./pages/sign-up/Signup";
   <Route path='/Tickets' element={<Liste/>}></Route>
                  <Route path='/Ticket' element={<Ticket/>}></Route>
                  <Route path='/Logout' element={<Logout/>}></Route>
                  <Route path='/Login' element={<Login/>}></Route>
                  <Route path='/Signup' element={<Signup/>}></Route>
                  <Route path='/ContactForm' element={<ContactForm/>}></Route>*/
  //import "./style.css"
 // import ContactForm from "./pages/contactForm/ContactForm";
  function App() {
    return (
      <BrowserRouter>
               
              <Routes>
                  
                  <Route path='/' element={<Home/>}></Route>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/Signup' element={<Signup/>}></Route>
                  <Route path='/ContactForm' element={<ContactForm/>}></Route>
                  <Route path='/Aggrid' element={<Aggrid/>}></Route>
                 
                  
              </Routes>
              </BrowserRouter>
    );
  }
  
  export default App;
