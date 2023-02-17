import { faFlag, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./footer.css"
import imgLogo from "./mmatchy.png"
const Footer = () => {
  let navigate=useNavigate()
  return (
    <div className='footer'>
      <h2 className='setting'>Regional Settings</h2>
      
      <label className='country'>
        <FontAwesomeIcon icon={faFlag}/>
         Country:
      </label>
      <select  className="country select">
            <option> __Worldwide__</option>
            <option >Tunisia</option>
            <option>France</option>
            <option >Marroc</option>
            <option >London</option>  
        </select>
        <label className='country'>
          <FontAwesomeIcon icon={faLanguage}/> Language : 
          </label>
      <select  className="country select">
            <option> Arabic</option>
            <option >English</option>
            <option>French</option>
           
        </select>
       
     <hr  className='hrfooter'/><img src={imgLogo} alt='logo' onClick={()=>{
      navigate('/')
     }} width={70} height={70}/>
     
    </div>
  )
}

export default Footer
