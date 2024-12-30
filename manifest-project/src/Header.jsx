import React, { useState, useContext } from "react";
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

function Header() {
  const navigate = useNavigate();

  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState(""); // Initialize with an empty string
  const [results, setResults] = useState([]);

  // Context values
  const {
    isHomeClicked,
    setIsHomeClicked,
    isCreateClicked,
    setIsCreateClicked,
  } = useContext(HeaderContext);

  // Handlers
  const handleHomeButtonClick = () => {
    setIsHomeClicked(true);
    setIsCreateClicked(false);
    navigate("/home-page");
  };

  const handleCreateClick = () => {
    setIsCreateClicked(true);
    setIsHomeClicked(false);
    navigate("/create-board");
  };

  const toggleDropdown = (event) => {
    setIsOpen(!isOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

//   const handleImageSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://api.unsplash.com/search/photos?query=${query}&page=1&per_page=20&client_id=QMm0cFjUe4-_ul5-M4hY2FqCWf2OcYKkcWTu7F0BLsM`
//       );
//       const data = await response.json();
//       setResults(data.results);
//       console.log(data.results);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

    const handleImageSearch = async () => {
        try {
        let page = 1;
        const perPage = 30;
        let allResults = [];
        let totalPages = 2;
    
        do {
            const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=${perPage}&client_id=QMm0cFjUe4-_ul5-M4hY2FqCWf2OcYKkcWTu7F0BLsM`
            );
            const data = await response.json();
    
            allResults = [...allResults, ...data.results];
            page++;
        } while (page <= totalPages);
    
        setResults(allResults);
        console.log(allResults);
        } catch (error) {
        console.error("Error fetching images:", error);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          handleImageSearch();
        }
      };

  return (
    <div
      style={{
        backgroundColor: "#F7F7F5",
        width: "100%",
        height: "79px",
        padding: "10px",
        boxSizing: "border-box",
        margin: "0 auto",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
      }}
    >
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
        onKeyDown={handleKeyDown}
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
      <Box sx={{ width: 1250, maxWidth: "100%", marginLeft: "33px" }}>
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
          value={10}
          className="text-black"
          style={{ color: "black", fontFamily: "Lausanne", fontWeight: "bolder" }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
