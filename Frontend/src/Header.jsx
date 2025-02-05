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
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';



function Header() {

  //accept the query variable here
  const navigate = useNavigate();

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState("");
  const [photos, setPhotos] = useState([]);
  const [pexelsPhotos, setPexelsPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [counter, setCounter] = useState(0);
  const [boards, setBoards] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = useState('');
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  

  const handleOpen = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  

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



  // const unsplashConfig = {
  //   headers: {
  //     'Authorization': `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
  //   },
  //   params: {
  //     query: query,
  //     per_page: 15,
  //     page
  //   }

  // };

  // useEffect(() => {
  //   let ignore = false;
  //   handleUnsplashImageSearch();

  //   return () => {
  //     ignore = true;
  //   };
  // }, [page])


    const handleUnsplashImageSearch = async () => {
      try {
        const response = await axios.get(
          'https://api.pexels.com/v1/search',
          pexelsConfig
        )
        setPexelsPhotos((prevPexelPhotos) => [...prevPexelPhotos, ...response.data.photos]) 
        console.log(response.data.photos)
        
        
      } catch (error) {
        console.log(error.message)
      }
    }
  
  useEffect(() => {
    handleUnsplashImageSearch();
  }, [page])

  const handleNext = () => {
      setPage(page + 1)
      // setCounter(counter + 1)
    
  }

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          setPage(0);
          event.preventDefault();
          setPhotos([])
          handleUnsplashImageSearch();
          setCounter(counter + 1)
      };
    }
  
  const pexelsConfig = {
    headers: {
      'Authorization': `${import.meta.env.VITE_PEXELS_API_KEY}`
    },
    params: {
      query: query,
      per_page: 40,
      page: page
    }
  }
  
  const fetchBoards = async () => {
    const response = await fetch('http://localhost:3000/api/getboards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log('Fetched data:', data); 
    setBoards(data.boards); 
  }

  const handleImageSelect = async (image) => {
    fetchBoards();
    
    if (selectedImage && !selectedImage.includes(image)) {
      setSelectedImage(prevSelectedImages => [...prevSelectedImages, image])
    }

  }

  const handleModalSelect = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/populateVisionBoard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: selectedBoard, 
          images: selectedImage
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
  
      const result = await response.json();
      console.log('Response from server:', result);
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
      <>
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
          height: "95px",
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
            flexDirection: "column",
            position: "relative",
            
          }}
        >
          {photos && photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => {
                handleOpen();
                handleImageSelect();
              }}
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

      {pexelsPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              onClick={() => {
                handleOpen();
                handleImageSelect(photo.src.original);
              }}
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

        {location.pathname === '/home-page' && counter >= 1 && (
          <Button onClick={handleNext}>Load Next Page</Button>
        )} 
       

       <Modal
        open={open}
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
                    console.log(selectedBoard)
                    handleModalSelect();
                  }}
                >
                  <div>{board.title}</div>
                </button>
              ))}
            </div>
            </div>

          </Box>
      </Modal>
       </div>

</>
    );

}

export default Header;




