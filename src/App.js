import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route,} from 'react-router-dom'
import Home from './Pages/Home'
import About from "./Pages/About";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Host from './Pages/Host';
import Pagenotfound from './Pages/Pagenotfound';
import NavigationMenu from './component/NavigationMenu';
import EventState from './context/events/EventState';
import Organized from './Pages/Organized';
import Volunteered from './Pages/Volunteered';
import ProtectedRoute from './Pages/ProtectedRoute'
function App() {
  return (
    <>
      <EventState>
        <BrowserRouter>
          <NavigationMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/organized'
              element={
                <ProtectedRoute>
                  <Organized />
                </ProtectedRoute>
              }
            />
              <Route path='/Host'
              element={
                <ProtectedRoute>
                  <Host />
                </ProtectedRoute>
              }
            />
              <Route path='/volunteered'
              element={
                <ProtectedRoute>
                  < Volunteered/>
                </ProtectedRoute>
              }
            />


            <Route path="/about" element={<About />} />
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
        </BrowserRouter>
      </EventState>
    </>
  );
}

export default App;
