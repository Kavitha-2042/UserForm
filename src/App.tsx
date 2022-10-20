import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import Profile from './Pages/Profile';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {
  return (
    <div>
      <BrowserRouter>
     <Routes >
      <Route path = '/signup' element = {<Signup/>} />
      <Route path = '/signin' element = {<Signin/>} />
      <Route path = '/profile' element = {<Profile/>} />
      <Route path = '/forgotpassword' element={<ForgotPassword/>} />
      <Route path = '/forgotpassword/:url' element={<ResetPassword/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
