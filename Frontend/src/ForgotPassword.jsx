// import './App.css'
// import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import { auth, sendPasswordResetEmail } from './firebase';



// function ForgotPassword() {
//     const [email, setEmail] = useState('');

//     const actionCodeSettings = {
//         url: "http://localhost:5173/reset-password",
//         handleCodeInApp: true,
//     }

//     const handlePasswordReset = async (email) => {
//         if (!email) {
//             alert("Email required")
//             return
//         }

//         try {
//             await sendPasswordResetEmail(auth, email, actionCodeSettings)
//             alert('Password reset email sent successfully!');
//         } catch (error) {
//             alert(`Error: ${error.message}`);
//         }
        
//     }

//     return (
//         <>

//             <div style={{ fontSize: '40px', fontFamily: 'Lausanne', color: '#000000', fontWeight:"bold", marginBottom: '30px' }}>
//                 Reset your password
//             </div>

//             <Box
//                 component="form"
//                 sx={{ '& > :not(style)': { m: 1, width: '690px' } }}
//                 noValidate
//                 autoComplete="off"
//             >
//                 <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} 
//                 sx={{ '& .MuiInputLabel-root': { fontFamily: 'Lausanne', fontWeight:"bolder" }, 
//                 '& .MuiInputBase-root': { fontFamily: 'Lausanne', fontWeight:"bolder" },  
//                 '& .MuiOutlinedInput-root': {
//                     borderRadius: '30px'
//                   }, }}/>
//             </Box>
            
//             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }} >
//                 <Button variant="contained" onClick={() => handlePasswordReset(email)} sx={{ width: '400px', height: '54px', color: '#FFFFFF', borderColor: '#000000', backgroundColor: '#481883', borderRadius:'30px'}}>
//                     Send a password reset email
//                 </Button>
//             </div>

//         </>
//     )
// }

// export default ForgotPassword;