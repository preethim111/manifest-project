import axios from 'axios';
import React, { useState } from 'react';


function ImageGallery ({ query, setQuery } ) {
    // const [query, setQuery] = useState("");
    const [photos, setPhotos] = useState([]);
    const [pexelsPhotos, setPexelsPhotos] = useState([]);

    const unsplashConfig = {
        headers: {
          'Authorization': 'Client-ID QMm0cFjUe4-_ul5-M4hY2FqCWf2OcYKkcWTu7F0BLsM',
        },
        params: {
          query: query,
          per_page: 30,
        }
    
      };
    
    
      const handleUnsplashImageSearch = async () => {
        try {
          const response = await axios.get(
            'https://api.unsplash.com/search/photos',
            unsplashConfig
            
          )
          setPhotos(response.data.results)
          console.log(photos)
        } catch (error) {
          console.log(error.message)
        }
      }
    
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleUnsplashImageSearch();
              handlePexelsImageSearch();
            }
          };
      
      const pexelsConfig = {
        headers: {
          'Authorization': 'RQnBtW9fGN1eXPMKAfIYko15tJqTpfd7G1w8Evef3Y4EQAE1vFPieo5L'
        },
        params: {
          query: query,
          per_page: 50
        }
      }  
      
      const handlePexelsImageSearch = async () => {
        try {
          const response = await axios.get(
            'https://api.pexels.com/v1/search',
            pexelsConfig
          )
          setPexelsPhotos(response.data.photos) 
          console.log(response.data.photos)
        } catch (error) {
          console.log(error.message)
        }
      }

      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              style={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={photo.urls.raw}
                alt={photo.alt_description}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}

      {pexelsPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                width: "100%",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={photo.src.original}
                alt={photo.alt}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))} 


        </div>
      )
}


export default ImageGallery;