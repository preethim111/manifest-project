import './App.css'
import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GoogleIcon from './assets/icons/google.png';
import { auth, createUserWithEmailAndPassword, updateProfile } from './firebase';
import { useNavigate } from "react-router-dom";


function CreateAccount() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


  const handleSignUp = async () => {
    if (!email || !password || !fullName) {
      setError("All fields are required")
      alert("All fields required")
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user


      // NEW
      await updateProfile(user, { displayName: fullName });
      console.log('User signed up with full name:', fullName);
      console.log('Updated user profile:', user.displayName);

      const userData = {
        email: user.email,
        fullName: fullName,
        password: password

      }


      // Send user data to the backend
      const response = await fetch(`${BACKEND_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to save user data to the backend');
      }

      navigate('/');

      console.log(responseData);
      console.log('User created:', userData)
    } catch (err) {
      console.error('Error creating account:', err.message);
    }
  }

    
    return (
      <>
      <div style={{ fontSize: '2.5rem', fontFamily: 'Lausanne', color: '#000000', paddingRight: '35rem', marginBottom: '20px', fontWeight: 'bold' }}>
        Sign up
      </div>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Full Name" variant="outlined" sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px', 
            fontFamily: 'Lausanne',
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' },
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' },
          }} onChange={(e) => setFullName(e.target.value)}/>
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

    <div style={{ fontSize: '1rem', fontFamily: 'Lausanne', color: '#000000' }}>
      or
    </div>


    <Button variant="outlined" sx={{ width: '100%', padding: '1rem', color: '#000000', borderColor: '#000000', marginTop: '1rem' }}>
      <img
            src={GoogleIcon}
            alt="Google Icon"
            style={{ width: '1rem', height: '1rem', marginRight: '1rem' }} 
          />
        Sign up with Google
    </Button>

    <div style={{
    display: 'flex',
    justifyContent: 'flex-start',
  }}>
      <Button variant="contained" onClick={handleSignUp} sx={{ width: '20%', padding: '1rem', color: '#FFFFFF', borderColor: '#000000', marginTop: '2rem' , backgroundColor: '#481883'}}>
        Sign up
      </Button>
    </div>
  

    </>

    )
}

export default CreateAccount