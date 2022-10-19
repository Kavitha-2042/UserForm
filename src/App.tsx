import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css';
import Signup from './Pages/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
     <Routes >
      <Route path = '/signup' element={<Signup/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
