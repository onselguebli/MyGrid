import React, { useState } from 'react'
import "./Navbar.css"
import imgLogo from "./mmatchy.png"
import { MenuItem } from './MenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faInfoCircle, faMessage, faPaperPlane, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faUser } from '@fortawesome/free-regular-svg-icons'

const Navbar=()=>  {
 
    let navigate=useNavigate()
    const [openUser, setOpenUser] = useState(false);
    return (
    <div className='navbar'>
       
      <div className='navContainer'>
         <img src={imgLogo} alt='logo' onClick={()=>{
          navigate('/')
         }} width={70} height={70}/>
       
      <div className="navItems">
      <button className="navButton1"><FontAwesomeIcon icon={ faPhone}  /> +216 21225675</button>
      
      <button className="navButton1"><FontAwesomeIcon icon={ faPaperPlane} /> onssiwar@gmail.com</button>
      <button className="navButton"><FontAwesomeIcon icon={ faInfoCircle} /></button>
           <button className="navButton" onClick={()=>{
          navigate('/ContactForm')
         }}> <FontAwesomeIcon icon={ faMessage}  /></button>
         
          <button className="navButton" onClick={() => setOpenUser(!openUser)} > <FontAwesomeIcon icon={ faUser} /> 
          
          
          {openUser&&   <ul className="rectangle-list"  >
            {MenuItem.map((item,index)=>{
              return(
                <li key={index}><a className={item.cName} href={item.url}>
                    {item.title}
                    </a>
                </li>
              )
            })}
          </ul>}
          
          </button> 
          
          </div>
      </div>
      
    </div>
  )}


export default Navbar
