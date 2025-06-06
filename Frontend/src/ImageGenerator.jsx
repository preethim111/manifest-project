import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Button, CircularProgress } from "@mui/material";
import Header from "./Header";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { auth } from "./firebase";
import { Snackbar, Alert } from "@mui/material"; 
import AudioRecorder from './AudioRecorder';

function ImageGenerator () {
    const [imageUrl, setImageUrl] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [boards, setBoards] = useState([]);
    const [open2, setOpen] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState('');
    const [selectedImageAI, setSelectedImageAI] = useState([]);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose2 = () => setOpen(false);

    const handleSnackBarClose = () => {
        setSnackBarOpen(false);
    }

    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const handleTranscriptionReceived = (transcription) => {
        setPrompt(transcription);
    };

    const generateImage = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'dall-e-3',
                    prompt: prompt,
                    n: 1,
                    size: '1024x1024'
                })
            })
            const data = await response.json();
            setImageUrl(data.data[0].url)
            console.log(imageUrl)


            console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

            setLoading(false);
        } catch (error) {
            console.error("Error generating image:", error);
            setLoading(false);
        }
    }


    const fetchBoards = async () => {

        const user = auth.currentUser;
                if (!user) {
                    console.error("No user is authenticated.");
                    return;
                }
    
                try {
                    const idToken = await user.getIdToken();
                    const userId = user.uid;
                    console.log(userId);
                    const response = await fetch(`${BACKEND_URL}/api/getboards/${userId}`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${idToken}`,
                            "Content-Type": "application/json",
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error("Failed to fetch vision boards");
                    }
    
                    const data = await response.json();
                    setBoards(data.boards);
            console.log(boards.title);
                } catch (error) {
                    console.error("Error fetching boards:", error);
                }
      }
    
      const handleImageSelectAI = async (imageAI) => {
        fetchBoards();
        
        if (selectedImageAI && !selectedImageAI.includes(imageAI)) {
          setSelectedImageAI(prevSelectedImagesAI => [...prevSelectedImagesAI, imageAI])
        }
    
      }


      const handleModalSelect = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/api/populateVisionBoardAI`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              title: selectedBoard, 
              imagesAI: selectedImageAI
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
      
          const result = await response.json();
          console.log('Response from server:', result);

          setSnackBarMessage(`Image added to ${selectedBoard} board`);
          setSnackBarOpen(true);

          handleClose2();
        } catch (error) {
          console.error('Error in handleModalSelect:', error);
        }
      };
      

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Header />
            <Box sx={{
                width: '100%',
                maxWidth: 600,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white'
            }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    Voice Prompt
                </Typography>
                <AudioRecorder onTranscriptionReceived={handleTranscriptionReceived} />
                
                <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 2 }}>
                    Text Prompt
                </Typography>
                <TextField
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    fullWidth
                    label="Type your prompt"
                    id="search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: "40px",
                            fontFamily: "Lausanne",
                            paddingLeft: '16px',
                        },
                    }}
                    sx={{
                        "& .MuiInputLabel-root": {
                            fontFamily: "Lausanne",
                            fontWeight: "bold",
                        },
                        marginBottom: '20px'
                    }}
                />
                <Button
                    variant="contained"
                    onClick={generateImage}
                    sx={{
                        borderRadius: '40px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&:hover': {
                            backgroundColor: '#ff5722', 
                        },
                    }}
                >
                    Generate Image
                </Button>

                {loading && (
                    <Box sx={{ marginTop: 2 }}>
                        <CircularProgress />
                    </Box>
                )}

                {imageUrl && !loading && (
                    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                        <img src={imageUrl} alt="Generated" style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }} onClick={() => {
                        handleOpen();
                        handleImageSelectAI(imageUrl);}}/>
                    </Box>
                )}
            </Box>

            <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h7" component="h2" color="#000000">
              Select vision board you want image added to: 
            </Typography>
           

            <div
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="#000000"
            >
  
            <div 
              style={{
                display: "flex",
                flexWrap: "wrap", 
                gap: "1rem", 
                justifyContent: "space-between",
              }}
            >
              {boards.map((board, index) => (
                <button
                  key={board.id || index} 
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "1 1 calc(50% - 1rem)",
                    marginBottom: "1rem",
                  }}
                  onClick={() => {
                    setSelectedBoard(board.title);
                    setTimeout(handleModalSelect, 100);

                  }}
                >
                  <div>{board.title}</div>
                </button>
              ))}
            </div>
            </div>

          </Box>
      </Modal>

      <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackBarClose} severity="success" sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ImageGenerator;
