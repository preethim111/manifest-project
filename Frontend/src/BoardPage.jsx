
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


function BoardPage() {
    
    const { title } = useParams();
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/getImages/${title}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        
                if (!response.ok) {
                    throw new Error(`Error fetching board: ${response.statusText}`);
                }
        
                const data = await response.json();
                console.log(data);
                setImages(data.images);
            } catch (error) {
                console.error(error);
            }
        };
        fetchImages();
        
    }, [title]);


    const handleCopyLink = () => {
        // const url = window.location.href;
        // navigator.clipboard.writeText(url);
        // alert("Board link copied!");

        const url = `${window.location.origin}/${title}`;
        navigator.clipboard.writeText(url);
        alert("Board link copied!");
      };

    return (
        <div style={{ color: "black", fontFamily: "Lausanne" }}>
            <Header />

            
        
            <h1>{title}</h1> 
            
           


            <Button variant="contained" sx={{ 
        marginBottom: "30px",
        marginRight: "10px", 
        padding: "12px 24px",
        fontSize: "18px",
        backgroundColor: "black", 
        justifyContent: "flex-start", 
        color: "white", 
        alignItems: "flex-start",
        borderRadius: "30px",
        "&:hover": {
            backgroundColor: "#333",
        },
        "&:active": {
            transform: "scale(0.95) translateY(2px)", 
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", 
        }

    }}
    onClick={() => navigate(`/ai-images/${title}`)}
    >
                AI Images
            </Button>
    
            <Button
                    onClick={handleCopyLink}
                    style={{
                    marginBottom: "30px",
                    padding: "10px 20px", // Adjust padding to make the button bigger
                    borderRadius: "30px", // Makes the button rounded
                    border: "none", // Optional: Removes border
                    color: "white", // Text color (white in this case)
                    cursor: "pointer", // Change cursor on hover
                    backgroundColor: "#303030"
                    }}
                >
                    <ContentCopyIcon />
            </Button>

            <div 
                style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "flex-start", 
                    alignItems: "flex-start",
                    gap: "25px",
                    width: "100%", 
                }}
            >
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                width: "350px", 
                                height: "20vh",
                                borderRadius: "15px", 
                                overflow: "hidden", 
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                transition: "all 0.3s ease-in-out",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <img 
                                src={image} 
                                alt={`Board image ${index + 1}`} 
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                    ))
                ) : (
                    <p style={{ fontSize: "18px", color: "#888" }}>No images available</p>
                )}
            </div>

        </div>
    );
}

export default BoardPage;
