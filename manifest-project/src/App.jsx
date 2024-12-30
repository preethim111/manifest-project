import './App.css'
import CreateBoard from './CreateBoard'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import CreateAccount from './CreateAccount'
import HomePage from './HomePage'
import { HeaderProvider } from './HeaderContext';  
import BoardPage from './BoardPage';



function App() {

  return (
    <HeaderProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element= {<CreateAccount />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/create-board" element={<CreateBoard/>} />
        <Route path="/:title" element={<BoardPage />} />
      </Routes>
    </HeaderProvider>
  )
}

export default App
