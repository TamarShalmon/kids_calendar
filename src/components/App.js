import { useState, createContext } from "react";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './Home'
import Calender from "./Calender";

export const UsersContext = createContext("user");

function App() {

  const [inputUser, setInputUser] = useState("");


  return (
    <UsersContext.Provider value={{ inputUser, setInputUser }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="*" element={<h1>Hi friend! The page was not found. </h1>} />
        </Routes>
      </Router>
    </UsersContext.Provider>



  );
}

export default App;