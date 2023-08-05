import React from 'react'
import Events from "../component/Events"
import volunteerimg from "./volunteer.jpg"
import './all.css'

const Home = () => {
  return (

    <div >
    {/* <div className="bgimg"></div> */}
    {/* <img src={volunteerimg} alt=""  /> */}
    <Events />
    </div>
  )
}

export default Home