import './App.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GoogleIcon from './assets/icons/google.png'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    
    // React.useEffect(() => {
    //   // Initialize Google Identity Services
    //   window.google.accounts.id.initialize({
    //     client_id: 'Y876023728805-knpanb6gpcagjoo1v36eb4sq7i72gr4n.apps.googleusercontent.com',
    //     callback: handleCredentialResponse,
    //   });
    // }, []);

    React.useEffect(() => {
      // Make sure the Google Identity Services script is loaded
      if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
              client_id: '876023728805-knpanb6gpcagjoo1v36eb4sq7i72gr4n.apps.googleusercontent.com', // Correct Client ID
              callback: handleCredentialResponse,
          });
      } else {
          console.error("Google Identity Services are not loaded.");
      }
  }, []);
  
    const handleCredentialResponse = (response) => {
      if (response.error) {
        console.error('Error during Google sign-in:', response.error);
        return;
      }
    
      console.log('Encoded JWT ID Token:', response.credential);
      // Use the credential (JWT) token to authenticate with your backend
    };
    
  
    const handleGoogleSignInClick = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt();
      } else {
        console.error("Google Identity Services are not loaded.");
      }
    };
    
    
    return (

        <>
      <div style={{ fontSize: '40px', fontFamily: 'Lausanne', color: '#000000', paddingRight: '527px', marginBottom: '20px', fontWeight: 'bold' }}>
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
          }}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px',
            fontFamily: 'Lausanne',
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' }, 
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' }, 
          }}/>
    </Box>

    <div style={{ fontSize: '16px', fontFamily: 'Lausanne', color: '#000000' }}>
      or
    </div>

    
    <Button variant="outlined" sx={{ width: '691px', height: '57px', color: '#000000', borderColor: '#000000', marginTop: 2 }} onClick={handleGoogleSignInClick}>
      <img
            src={GoogleIcon}
            alt="Google Icon"
            style={{ width: '24px', height: '24px', marginRight: '10px' }} 
          />
        Sign in with Google
    </Button>

    <div>
      <Button variant="contained" sx={{ width: '160px', height: '54px', color: '#FFFFFF', borderColor: '#000000', marginTop: 6 , backgroundColor: '#481883', marginRight: '369px'}}
      onClick={() => navigate('/home-page')}
      >
        Sign in
      </Button>
      <Button variant="text" sx={{ width: '160px', height: '54px', color: '#000000', borderColor: '#000000', marginTop: 6, marginRight: '' }}
      onClick={() => navigate('/create-account')}>
        Create Account
      </Button>
    </div>
  

    </>
    )
}


export default Login;