import './App.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import GoogleIcon from './assets/icons/google.png'


function CreateAccount() {
    return (
      <>
      <div style={{ fontSize: '40px', fontFamily: 'Lausanne', color: '#000000', paddingRight: '566px', marginBottom: '20px', fontWeight: 'bold' }}>
        Sign up
      </div>
      <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '690px' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Full Name" variant="outlined" sx={{
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
            borderRadius: '4px', 
            fontFamily: 'Lausanne',
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' },
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' },
          }}/>
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
            fontFamily: 'Lausanne' ,
            '& .MuiInputLabel-root': { fontFamily: 'Lausanne' },
            '& .MuiInputBase-root': { fontFamily: 'Lausanne' },
          }}/>
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
        Sign up with Google
    </Button>

    <div>
      <Button variant="contained" sx={{ width: '160px', height: '54px', color: '#FFFFFF', borderColor: '#000000', marginTop: 6 , backgroundColor: '#481883', marginRight: '530px'}}>
        Sign up
      </Button>
    </div>
  

    </>

    )
}

export default CreateAccount