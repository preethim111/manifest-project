import React, { useState, useContext, useEffect } from "react";
import { FaBullseye } from "react-icons/fa";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Menu, MenuItem } from "@mui/material";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { HeaderContext } from "./HeaderContext";
import axios from 'axios';
// import ImageGallery from "./ImageGallery";

function Header() {
  //accept the query variable here
  const navigate = useNavigate();

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [pexelsPhotos, setPexelsPhotos] = useState([]);
  const [loadedData, setLoadedData] = useState([])
  const [loading, setLoading] = useState(false)
  // const [currentPage, setCurrentPage] = useState(1);

  // Context values
  const {
    isHomeClicked,
    setIsHomeClicked,
    isCreateClicked,
    setIsCreateClicked,
    isVisionBoardsClicked,
    setIsVisionBoardsClicked
  } = useContext(HeaderContext);

  // Handlers
  const handleHomeButtonClick = () => {
    setIsHomeClicked(true);
    setIsCreateClicked(false);
    setIsVisionBoardsClicked(false);
    navigate("/home-page");
  };

  const handleCreateClick = () => {
    setIsCreateClicked(true);
    setIsHomeClicked(false);
    setIsVisionBoardsClicked(false);
    navigate("/create-board");
  };

  const handleVisionBoardsClick = () => {
    setIsVisionBoardsClicked(true);
    setIsCreateClicked(false);
    setIsHomeClicked(false);
    navigate("/all-boards")
  }

  const toggleDropdown = (event) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
  };



  const unsplashConfig = {
    headers: {
      'Authorization': 'Client-ID QMm0cFjUe4-_ul5-M4hY2FqCWf2OcYKkcWTu7F0BLsM',
    },
    params: {
      query: query,
      per_page: 20,
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
          // fetchImages();

      };
    }
  
  const pexelsConfig = {
    headers: {
      'Authorization': 'RQnBtW9fGN1eXPMKAfIYko15tJqTpfd7G1w8Evef3Y4EQAE1vFPieo5L'
    },
    params: {
      query: query,
      per_page: 40
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
          backgroundColor: "#F7F7F5",
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          margin: "0 auto",
          position: "absolute",
          top: "0",
          left: "0",
          display: "flex",
          flexDirection: "column",
          height: "95px", // Adjust this to limit the height
        }}
      >
        {/* Header Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaBullseye
            style={{
              width: "24px",
              height: "24px",
              color: "#000",
              marginLeft: "20px",
            }}
          />
          <Button
            variant="text"
            style={{
              marginLeft: "25px",
              fontFamily: "Lausanne",
              fontWeight: "bolder",
              fontSize: "18px",
              color: isHomeClicked ? "#FFFFFF" : "#000000",
              backgroundColor: isHomeClicked ? "#000000" : "transparent",
              borderRadius: isHomeClicked ? "20px" : "none",
            }}
            onClick={handleHomeButtonClick}
          >
            Home
          </Button>
          <Button
            variant="text"
            style={{
              marginLeft: "25px",
              fontFamily: "Lausanne",
              fontWeight: "bolder",
              fontSize: "18px",
              color: isCreateClicked ? "#FFFFFF" : "#000000",
              backgroundColor: isCreateClicked ? "#000000" : "transparent",
              borderRadius: isCreateClicked ? "20px" : "none",
            }}
            onClick={handleCreateClick}
          >
            Create
          </Button>

          <Button
            variant="text"
            style={{
              marginLeft: "25px",
              fontFamily: "Lausanne",
              fontWeight: "bolder",
              fontSize: "18px",
              color: isVisionBoardsClicked ? "#FFFFFF" : "#000000",
              backgroundColor: isVisionBoardsClicked ? "#000000" : "transparent",
              borderRadius: isVisionBoardsClicked ? "20px" : "none",
            }}
            onClick={handleVisionBoardsClick}
          >
            Vision Boards
          </Button>

          <Box sx={{ width: 800, maxWidth: "100%", marginLeft: "33px" }}>
            <TextField
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
              label="Search"
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
                },
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  fontFamily: "Lausanne",
                  fontWeight: "bold",
                },
              }}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <AccountCircleIcon
            sx={{
              color: "rgb(118, 118, 118)",
              marginRight: "10px",
              fontSize: "1.9rem",
              marginLeft: "20px",
            }}
          />
          <button
            onClick={toggleDropdown}
            style={{
              marginRight: "10px",
              fontSize: "1.9rem",
              marginLeft: "10px",
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <KeyboardArrowDownIcon style={{ color: "black" }} />
          </button>
          <Menu
            open={isOpen}
            onClose={handleClose}
            anchorEl={anchorEl}
            PaperProps={{
              style: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <MenuItem
              onClick={() => navigate("/")}
              style={{
                color: "black",
                fontFamily: "Lausanne",
                fontWeight: "bolder",
              }}
            >
              Sign out
            </MenuItem>
          </Menu>
        </div>

        {/* Image Grid Section */}
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


      </div>
    );

}

export default Header;




