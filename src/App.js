import logo from './Psyduck.png';
import ExternalApiComponent from './modules/preference'
import LoginButton from './modules/login'
import LogoutButton from './modules/logout'
import Profile from './modules/login/profile'
import './App.css';
import React from 'react';
import {
  BrowserRouter
} from "react-router-dom";


const color = 'black'
function App() {


  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header" style={{ backgroundColor: color }} >
          <img src={logo} style={{ backgroundColor: "lightblue" }} className="App-logo" alt="logo" />
          <p>
            Game Psyduck
          </p>
          <LoginButton></LoginButton><LogoutButton></LogoutButton>

          <Profile></Profile>
          <ExternalApiComponent></ExternalApiComponent>

        </header>

      </div>
    </BrowserRouter>
  );

}

export default App;
