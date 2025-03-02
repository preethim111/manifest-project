import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./src/Header";

function AiImages() {
    const [aiImages, setAiImages] = useState([]);
    const { title } = useParams();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const fetchAiImages = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/api/getAiImages/${title}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error fetching board: ${response.statusText}`);
                }

                const data = await response.json();
                if (Array.isArray(data.imagesAI)) {
                    setAiImages(data.imagesAI);
                } else {
                    setAiImages([]);
                }
            } catch (error) {
                console.error("Error fetching images:", error);
                setAiImages([]);
            }
        };

        if (title) {
            fetchAiImages();
        }
    }, [title]);

    return (
        <div style={{ width: "100%", padding: "20px" }}>
            <Header />
            <div style={{ color: "black", fontFamily: "Lausanne" }}>
                <h1>
                    AI Images
                </h1>
            </div>
            <div 
                style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    justifyContent: "flex-start", 
                    alignItems: "flex-start",
                    gap: "10px",
                }}
            >
                {aiImages.length === 0 ? (
                    <p>No images available</p>
                ) : (
                    aiImages.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt={`AI Image ${index}`} 
                            style={{ 
                                width: "300px", 
                                height: "300px", 
                                objectFit: "cover",
                                borderRadius: "8px",
                                boxShadow: "2px 2px 10px rgba(0,0,0,0.1)"
                            }} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default AiImages;