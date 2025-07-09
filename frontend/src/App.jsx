import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Socialicon from './components/Socialicon';
import Cookie from './pages/Cookie';

const App = () => {
  return (
    <>
    
    <Navbar/>
    <Outlet/>
    <Footer/>
     <Socialicon/>
     <Cookie />
    </>
  );
};

export default App;
