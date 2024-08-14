import React, { useState } from 'react';

import './App.css';
import { Home } from './pages/Home';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Foods } from './pages/Foods';
import { Login } from './pages/User/Login';
import { Signup } from './pages/User/Signup';
import { Admin } from './pages/Admin/Admin';
import { AddNewFood } from './pages/Admin/AddNewFood';
import { Cart } from './pages/Cart';
import { Details } from './pages/Details';
import { Navbar } from './components/Navbar';
import { Orders } from './pages/Admin/Orders';
import { Editfoods } from './pages/Admin/Editfoods';
import { Offers } from './components/Offers';
import { Footer } from './components/Footer';

function App() {
  const[isAuth,setAuth]=useState<boolean>(localStorage.getItem("Auth")==="true");
  const location = useLocation();
  
    const showNavbar = location.pathname !== "/signup" && location.pathname !== "/";
  return (
    <div className="App">
      {showNavbar &&<Navbar setAuth={setAuth} />}
      <Routes>
        <Route  path="offers" element={<Offers isAuth={isAuth}/>} />
        <Route path="/" element={<Home setAuth={setAuth}/>}/>
        <Route path="signup" element={<Signup setAuth={setAuth}/>}/>
        <Route path="login" element={<Login setAuth={setAuth} />}/>
        <Route path="/Food/:cat" element={<Foods isAuth={isAuth}/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="addNew" element={<AddNewFood/>}/>
        <Route path="Edit_meals" element={<Editfoods/>}/>
        <Route path="admin" element={<Admin/>}/>
        <Route path="menu" element={<Menu/>}/>
        <Route path='cart' element={<Cart isAuth={isAuth} />}/>
        <Route  path="/details/:mealId" element={<Details isAuth={isAuth} />}/>
      </Routes>
      {showNavbar &&<Footer/>}
    </div>
  );
}

export default App;
