import React from 'react'
//import Navbar from '../../components/navbar/Navbar'
//import Header from '../../components/header/Header'
import "./Home.css"
//import { Featured } from '../../components/featured/Featured'
//import TableOfTickets from '../../components/tableOfTickets/TableOfTickets'
import Footer from '../../component/footer/Footer'
import Navbar from '../../component/navbar/Navbar'
import Header from '../../component/header/Header'
export const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
       
          <Footer />
        </div>
    </div>
  )
}
export default Home