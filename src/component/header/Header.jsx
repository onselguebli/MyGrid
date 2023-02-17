import React from 'react'
import aggrid from "./aggrid.png"
import "./header.css"

const Header = () => {
    return(
        
        <div className='header'>
          <div>
            <img src={aggrid} alt='log' height={900}/>
          </div>
          <div className='paragraphe'>
            <h1>get your grid NOW!!!!!</h1>
            <p>MyGrid is a platform that helps you to access your data easily and to manipulate <br></br>it with a different settings and buttons.</p>
          </div>
        </div>

        
    );
}
export default Header