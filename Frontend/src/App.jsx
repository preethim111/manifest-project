import './App.css'
import CreateBoard from './CreateBoard'
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login'
import CreateAccount from './CreateAccount'
import HomePage from './HomePage'
import { HeaderProvider } from './HeaderContext';  
import BoardPage from './BoardPage';
// import ForgotPassword from './ForgotPassword'
import ResetPassword from './ResetPassword';
import AllBoards from './AllBoards';
import { ImageProvider } from './ImageContext';
import { BoardsProvider } from './BoardsContext';
import ImageGenerator from './ImageGenerator';
import AiImages from '../AiImages';



function App() {

  return (
    <HeaderProvider>
      <BoardsProvider>
        <ImageProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/create-account" element= {<CreateAccount />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/create-board" element={<CreateBoard/>} />
            <Route path="/:title" element={<BoardPage />} />
            {/* <Route path="/forgot-password" element={<ForgotPassword />}/> */}
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/all-boards" element={<AllBoards />} />
            <Route path="/ai-image-generator" element={<ImageGenerator />} />
            <Route path="/ai-images/:title" element={<AiImages />}/>
          </Routes>
        </ImageProvider>
      </BoardsProvider>
    </HeaderProvider>
  )
}

export default App
