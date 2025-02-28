import React, { useState, useEffect } from 'react';
import { auth, confirmPasswordReset } from './firebase';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';        


function ResetPassword() {
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [oobCode, setOobCode] = useState('')
    const navigate = useNavigate()
    
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search)
    //     const code = urlParams.get('oobCode')
    //     console.log('oobCode from URL:', code); // Check this in the console

    //     if (code) {
    //         setOobCode(code)
    //     } else {
    //         alert("Invalid or expired password reset link.")
    //     }
    // }, [])

    const handleReset = async () => {
        if (!newPassword) {
            alert("Please enter new password")
            return
        }

        try {
            // Step 1: Update new password in Firebase
            // await confirmPasswordReset(auth, oobCode, newPassword)
            // alert('Password reset successfully in Firebase!');


            // Step 2: Update new password in MongoDB
            const response = await fetch(`${BACKEND_URL}/api/reset`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ email, newPassword })
            })

            if (!response.ok) {
                alert('Failed to update password');
            }


            const data = await response.json();
            console.log('Success:', data);
            alert('Password reset successfully!');
            navigate('/');
        } catch (error) {
            alert(`Error: ${error.message}`)
        }
    }

    return (
        <>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Lausanne', color: '#000000', fontWeight:"bold", marginBottom: '2rem' }}>
                Reset your password
            </div>

            <Box
                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} 
                sx={{ '& .MuiInputLabel-root': { fontFamily: 'Lausanne', fontWeight:"bolder" }, 
                '& .MuiInputBase-root': { fontFamily: 'Lausanne', fontWeight:"bolder" },  
                '& .MuiOutlinedInput-root': {
                    borderRadius: '30px'
                  }, }}/>
                  <TextField id="outlined-password-input" label="Password" variant="outlined" type="password" value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} sx={{ '& .MuiInputLabel-root': { fontFamily: 'Lausanne', fontWeight:"bolder" }, 
        '& .MuiInputBase-root': { fontFamily: 'Lausanne', fontWeight:"bolder" },  
        '& .MuiOutlinedInput-root': {
            borderRadius: '30px'
          },
            }} />
            </Box>


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }} >
                <Button variant="contained" onClick={handleReset} sx={{ width: '70%', padding:'1rem', color: '#FFFFFF', borderColor: '#000000', backgroundColor: '#481883', borderRadius:'30px'}}>
                    Reset Password
                </Button>
            </div>
        </>
    )

}

export default ResetPassword