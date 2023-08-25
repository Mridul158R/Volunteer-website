import React from 'react'
import "./about.css"

export const About = () => {
  return (
    <div className="bod">
    <section>
            <div className ="image1">
               <img src="https://cdn.pixabay.com/photo/2017/08/26/23/37/business-2684758__340.png" />
            </div>

            <div className ="content1">
                <br />
                <h2>About Me</h2>
                <span></span>
                <h1 className='harsh'>Mridul Pati Tiwari</h1>
                <br />
                <p>A MERN Stack Developer, a DSA Problem Solver, a Competetive Programmer...</p>
                <p>In Short, BTech. UnderGrad from IIIT BBSR...</p>
                <ul className ="links1">
                    <li><a href = "https://github.com/Mridul158R"  target="_blank" rel="noopener noreferrer">Development</a></li>
                    <div className ="vertical-line"></div>
                    <li><a href = "https://leetcode.com/mridultiwari70/"  target="_blank" rel="noopener noreferrer">DS ALgorithm</a></li>
                    <div className ="vertical-line"></div>
                    <li><a href = "https://www.codechef.com/users/mridul158"  target="_blank" rel="noopener noreferrer">Competetive Programming</a></li>
                </ul>
                <ul className ="icons1">
                   
                    <li>
                    <a href="https://www.facebook.com/login/" style={{color:"inherit",margin:"2px"}} target="_blank" rel="noopener noreferrer"><i className ="bi bi-facebook"></i></a>
                    </li>
                    <li>
                    <a href="https://github.com/Mridul158R" style={{color:"inherit",margin:"2px"}} target="_blank" rel="noopener noreferrer"><i className ="bi bi-github"></i></a>
                    </li>
                    <li>
                    <a href="https://www.linkedin.com/in/mridul-pati-tiwari-25023a220/" style={{color:"inherit",margin:"2px"}} target="_blank" rel="noopener noreferrer"><i className ="bi bi-linkedin"></i></a>
                    </li>
                </ul>
            </div>
        </section>
    </div>
  )
}

export default About
