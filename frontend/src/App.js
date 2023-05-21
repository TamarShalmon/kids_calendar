import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css';
import Home from './pages/Home/Home'
import Calender from "./pages/Calender/Calender";
import MobileOnly from "./pages/MobileOnly/MobileOnly";


function App() {

  return (
    <>
      <MobileOnly />
      <div className="tamar">Developed & Designed by Tamar Shalmon
        <a href="https://www.linkedin.com/in/tamar-shalmon-318ab01a0" target="_blank">
          <img className="tamar-linkdin"
            src="https://cdn-icons-png.flaticon.com/512/61/61109.png?w=360" />
        </a>
      </div>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="*" element={<h1>Hey friend! The page was not found. </h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;