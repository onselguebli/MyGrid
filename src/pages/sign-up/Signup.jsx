import React, { useState } from 'react'
import Navbar from '../../component/navbar/Navbar'
import Footer from '../../component/footer/Footer'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import "./signup.css"
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [value, setValue] = useState()
    let navigate = useNavigate()
    return (
    <div >
        <Navbar/>
        <div  className="back" >
          <div className="login-form">
              <form>
                <h1>Sign Up</h1>
                <div className="content">
                    <div className="input-field">
                        <input type="text" placeholder="First Name" autocomplete="nope" required="required" />
                    </div>
                    <div className="input-field">
                        <input type="text" placeholder="Last Name" autocomplete="nope" required/>
                    </div>
                    <div className="input-field">
                        <input type="email" placeholder="Email" autocomplete="nope" required/>
                    </div>
                    
                    <div className="input-field">
                    <PhoneInput
                        placeholder=" phone number"
                         value={value}
                        onChange={setValue}/>
                    </div>
                    <div className="input-field">
                        <input type="password" placeholder="Password" autocomplete="new-password" required/>
                    </div>
                </div>
                <div className="action">

                    <button onClick={()=>{
                        navigate('/Login')
                    }}>Sign in</button>
                </div>
             </form>
            </div>
        </div>
        <div className='footersignup'>
         <Footer/></div>
    </div>

  )
}

export default Signup