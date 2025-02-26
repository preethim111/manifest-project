
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";


function BoardPage() {
    
    const { title } = useParams();
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/getImages/${title}`, {
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

    return (
        <div style={{ color: "black", fontFamily: "Lausanne" }}>
            <Header />
            <h1>{title}</h1> 

            <Button variant="contained" sx={{ 
        marginBottom: "25px", 
        padding: "12px 24px",
        fontSize: "18px",
        backgroundColor: "black", 
        color: "white", 
        borderRadius: "30px",
        "&:hover": {
            backgroundColor: "#333", // Slightly lighter black on hover
        },
        "&:active": {
            transform: "scale(0.95) translateY(2px)", // Press-down effect
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Adjusted shadow for depth effect
        }

    }}
    onClick={() => navigate(`/ai-images/${title}`)}
    >
                AI Images
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
