import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import 'flag-icon-css/css/flag-icons.min.css';
import i18next from 'i18next';

import Home from './pages/Home/Home';
import Calender from "./pages/Calender/Calender";
import MobileOnly from "./pages/MobileOnly/MobileOnly";

import './App.css';
import './index.css';

import Cookies from 'js-cookie';
import languages from './assets/data/languages';


function App() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentLanguageCode = Cookies.get('i18next') || 'en'
  const currentLanguage = languages.find(l => l.code === currentLanguageCode)
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage])

  return (
    <>
      <MobileOnly />
      <div className="tamar">{t('tamar')}
        <a href="https://www.linkedin.com/in/tamar-shalmon-318ab01a0" target="_blank">
          <img
            className="tamar-linkdin"
            src="https://cdn-icons-png.flaticon.com/512/61/61109.png?w=360"
            alt="LinkedIn"
          />
        </a>
      </div>

      <div className="languages no-print" dir='rtl'>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{
            color: 'black',
            fontFamily: 'Neucha, Rubik, cursive',
            fontSize: '15px',
            background: '#e8f0fe',
            padding: '2px',
          }}
        > en/עב
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {languages.map(({ code, name, country_code }) =>
            <MenuItem
              key={code}
              onClick={() => { handleClose(); i18next.changeLanguage(code) }}
              disabled={code === currentLanguageCode}
            >
              <span
                className={`flag-icon flag-icon-${country_code}`}
                style={{ paddingLeft: '15px', opacity: code === currentLanguageCode ? 0.5 : 1 }}
              >

              </span>
              {name}
            </MenuItem>
          )}
        </Menu>
      </div>

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calender" element={<Calender />} />
            <Route path="*" element={<h1>{t('404')}</h1>} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;