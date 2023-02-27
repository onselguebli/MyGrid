import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../../component/footer/Footer'
import Navbar from '../../component/navbar/Navbar'
import "./login.css"

const Login = () => {
  
  /*const [email, setEmail] = ('')
  const [password, setPassword] = ('')

  async function button(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/Aggrid", {
        email, password
      })
    } catch {
      console.log(e);
    }
  }*/

  let navigate = useNavigate()
  return (
    <div className='loginfront'>
      <Navbar />
      <div className="backlogin" >


        <div className="login-form">
          <form action="POST">
            <h1>Login</h1>
            <div className="content">
              <div className="input-field">
                <input type="email" placeholder="Email" autocomplete="nope"  required />
              </div>
              <div className="input-field">
                <input type="password" placeholder="Password" autocomplete="new-password"  required />
              </div>
            </div>
            <div className="action">
              <button onClick={()=>{
                      navigate('/Aggrid')}}>Login</button>
            </div>
            <br />
            
          </form>
        </div>
      </div>
      <div className='footersignup'>
        <Footer />
      </div>
    </div>
  )
}

export default Login
