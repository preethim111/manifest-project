import Header from './Header';
import React, { useContext, useState } from 'react';
import { HeaderContext } from './HeaderContext'; 
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileUploadArea from './FileUpload';
import { useNavigate } from 'react-router-dom'; 


function CreateBoard() {
    const { isCreateClicked } = useContext(HeaderContext);  
    const [title, setTitle] = useState('');
    const navigate = useNavigate()

    const handleCreateClick = () => {
        if (title) {
            navigate(`/${title}`);
        } else {
            alert('Please provide a title for you board')
        }
    }

    return (
        <>
            <Header />
            <div style={{ 
                fontSize: '40px', 
                fontFamily: 'Lausanne', 
                color: '#000000', 
                paddingRight: '527px', 
                marginBottom: '40px', 
                fontWeight: 'bold' 
            }}>
                Create Vision Board
            </div>
            <div style={{ display: 'flex',  }}>
                {/* File Upload Area */}
                <div style={{ 
                    flex: '0 0 300px', 
                    marginRight: '60px', 
                    marginLeft: '146px',
                }}>
                    <FileUploadArea />
                </div>
                
                <div style={{ flex: '1' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <TextField 
                            id="title" 
                            label="Title" 
                            variant="outlined"
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}
                            InputProps={{ 
                                sx: {
                                    borderRadius: '22px', 
                                    fontFamily: 'Lausanne',
                                    borderWidth: '40px', 
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                                    width: '600px',
                                },
                            }}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    fontFamily: 'Lausanne', 
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </div>
                    <div>
                        <TextField 
                            id="description" 
                            label="Description" 
                            variant="outlined" 
                            multiline 
                            rows={4}
                            InputProps={{ 
                                sx: {
                                    borderRadius: '22px', 
                                    fontFamily: 'Lausanne',
                                    borderWidth: '40px', 
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
                                    width: '600px',
                                },
                            }}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    fontFamily: 'Lausanne', 
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '50px', position: 'relative', left: '-358px'}}>
                <Button 
                    variant="contained" 
                    sx={{ 
                        width: '150px', 
                        height: '54px', 
                        color: '#FFFFFF', 
                        borderColor: '#000000', 
                        backgroundColor: '#481883', 
                        borderRadius: '30px', 
                    }}
                    onClick={handleCreateClick}
                >
                    Create
                </Button>
            </div>

        </>
    );
}

export default CreateBoard;
