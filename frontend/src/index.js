import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './components/pages/loginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/pages/registerPage';
import UserProfile from './components/pages/userProfilePage';
import QRCodeScanner from './components/qrCodeScanner';
import AccessDenied from './components/pages/accessDeniedPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='profile' element={<UserProfile />} />
      <Route path='scan' element={<QRCodeScanner />} />
      <Route path='accessDenied' element={<AccessDenied />} />
    </Routes>
  </BrowserRouter>
);

