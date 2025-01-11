import './App.css'
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GoogleIcon from './assets/icons/google.png'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword, signInWithPopup, provider, sendPasswordResetEmail } from './firebase';



function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const checkEmailPasswordInDatabase = async (email, password) => {
      try {
        const response = await fetch('http://localhost:3000/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })

        if (response.status === 404) {
          alert('Email not found. Please enter a valid email or create an account.')
          return false
        } else if (response.status === 401) {
          alert ('Invalid credentials')
          return false
        } 
        else if (response.status === 200) {
          return true
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.message}`);
          return false;
        }

      } catch (error) {
        alert("Unable to validate crendentials")
        return false
      }
    }


    
    const handleEmailPasswordSignIn = async (email, password) => {
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }

      const emailPasswordExists = await checkEmailPasswordInDatabase(email, password)

      if (emailPasswordExists) {
        try {
          const userCredential = signInWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
          
          navigate('/home-page')
        } catch (err) {
          console.error('Error signing in:', err.message);
          alert(err.message);
        }
      } 

      
    }


    return (

        <>
      <div style={{ fontSize: '40px', fontFamily: 'Lausanne', color: '#000000', paddingRight: '527px', marginBottom: '40px', fontWeight: 'bold' }}>
        Welcome!
      </div>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '690px' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Email" variant="outlined" sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px', 
            fontFamily: 'Lausanne',
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' }, 
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' },
          }} onChange={(e) => setEmail(e.target.value)}/>

      <TextField id="outlined-password-input" label="Password" variant="outlined" type="password" sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px',
            fontFamily: 'Lausanne',
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' }, 
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' }, 
          }} onChange={(e) => setPassword(e.target.value)}/>
    </Box>

    <div style={{ fontSize: '16px', fontFamily: 'Lausanne', color: '#000000' }}>
      or
    </div>

    
    <Button variant="outlined" sx={{ width: '691px', height: '57px', color: '#000000', borderColor: '#000000', marginTop: 2 }}>
      <img
            src={GoogleIcon}
            alt="Google Icon"
            style={{ width: '24px', height: '24px', marginRight: '10px' }} 
          />
        Sign in with Google
    </Button>

    <div style={{ fontSize: '14px', fontFamily: 'Lausanne', color: '#000000', fontWeight: 'bold', marginTop: '28px', marginRight:'575px', marginBottom: '20px'}}>
        <Button style={{ color: '#000000', textTransform: 'none', fontFamily: 'Lausanne', fontWeight: 'bold', }} 
    disableRipple onClick={() => navigate('/reset-password')}>
          Forgot Password?
        </Button>
    </div>

    <div>
      <Button variant="contained" sx={{ width: '160px', height: '54px', color: '#FFFFFF', borderColor: '#000000', backgroundColor: '#481883', marginRight: '369px',}}
      onClick={() => handleEmailPasswordSignIn(email, password)}
      >
        Sign in
      </Button>
      <Button variant="text" sx={{ width: '160px', height: '54px', color: '#000000', borderColor: '#000000', marginTop: '20px', marginRight: '' }}
      onClick={() => navigate('/create-account')}>
        Create Account
      </Button>
    </div>
  

    </>
    )
}


export default Login;