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
import axios from 'axios';
import Memberships from './components/pages/memberships';
import UserList from './components/pages/userListPage';
import RegisterTrainer from './components/pages/registerTrainerPage';
import AddMembershipPage from './components/pages/addMembershipPage';
import AddTrainingPage from './components/pages/addTrainingPage';
import TrainingCalendar from './components/pages/trainingCalendarPage';
import TrainingList from './components/pages/trainingListPage';
import UserProfileForAdmin from './components/pages/userProfileForAdminPage';

axios.interceptors.request.use(
  request => {
    console.log(request.url)
    const token = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token")
    if(token) {
      request.headers['Authorization'] = 'Bearer ' + token
    }
    if(refreshToken && request.url == "http://localhost:8080/users/token/refresh") {
      request.headers['Authorization'] = 'Bearer ' + refreshToken
    }
    return request
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  
  response => {
    return response
  },

  function(error) {
    const originalRequest = error.config 
    if(error.response.status === 401 &&
      originalRequest.url === 'http://localhost:3000/users/token/refresh') 
      {
        window.location.href('/login');
      }

    if(error.response.status === 403 &&
      !originalRequest._retry)
      {
        originalRequest._retry = true
        return axios.get('http://localhost:8080/users/token/refresh',)
                    .then(res => {
                      if(res.status === 200) {
                        localStorage.setItem('access_token', res.data.access_token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
                      }
                    })
      }
      return Promise.reject(error)

  }
)

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
      <Route path='memberships' element={<Memberships />} />
      <Route path='users' element={<UserList />} />
      <Route path='registerTrainer' element={<RegisterTrainer />} />
      <Route path='addMembership' element={<AddMembershipPage />} />
      <Route path='addTraining' element={<AddTrainingPage />} />
      <Route path='calendar' element={<TrainingCalendar />} />
      <Route path='trainings' element={<TrainingList />} />
      <Route path='user/:username' element={<UserProfileForAdmin />} />
    </Routes>
  </BrowserRouter>
);

