import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FrontPage from './components/pages/frontPage';
import Login from './components/pages/loginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/pages/registerPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter >
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Routes>
  </BrowserRouter>
);

