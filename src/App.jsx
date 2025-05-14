// App.jsx
import './index.css';
import React from 'react';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { ApplicationViews } from './views/ApplicationViews';
import { Authorized } from './views/Authorized';

import { Route, Routes } from 'react-router-dom';

export const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="*" 
        element ={
          <Authorized>
            <ApplicationViews />
          </Authorized>} />
    </Routes>
  );
};