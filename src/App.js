import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import ContactUs from "./Pages/ContactUs";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Host from './Pages/Host';
import Pagenotfound from './Pages/Pagenotfound';
import NavigationMenu from './component/NavigationMenu';
import EventState from './context/events/EventState';
import Organized from './Pages/Organized';
import Volunteered from './Pages/Volunteered';

function App() {
  // const location = useLocation();

  // const hideHeaderRoutes = ['/login', '/signup']; // Add routes where you want to hide the header

  // const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);
  return (
    <>
    <EventState>
      <BrowserRouter>
      <NavigationMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
        <Route path="/about" element={<About />} />
        {/* <Route path="/ContactUs" element={<ContactUs />} /> */}
        <Route path="/host" element={<Host />} />
        <Route path="/organized" element={<Organized/>} />
        <Route path="/volunteered" element={<Volunteered />} />
      
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
    </EventState>
    </>
  );
}

export default App;
