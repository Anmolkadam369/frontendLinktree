// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './Components/Home';
import SignUpPage from "./Components/SignUpPage";
import AboutYou from './Components/AboutYou';
import Verification from './Components/Verification';
import CheckValid from './Components/CheckValid';
import DashBoard from './Components/Dashboard';
import LoginPage from './Components/LoginPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signup/:username" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path='/moreInfo' element={<AboutYou/>}/>
          <Route path='/verification' element={<Verification/>}/>
          <Route path='/checkValid/:token' element={<CheckValid/>}/>
          <Route path="/userAuth/dashBoard" element={<DashBoard/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;




