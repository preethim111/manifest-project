// import Header from "./Header";
// import { auth } from "./firebase";
// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import CardActionArea from "@mui/material/CardActionArea";
// import FileUploadArea from "./FileUpload";
// import { useImageContext } from "./ImageContext";
// import { useContext } from "react";
// import { BoardsContext } from "./BoardsContext";
// import { useNavigate } from "react-router-dom";

// function AllBoards() {
// 	const location = useLocation();
// 	const { title, thumbnail } = location.state || {};
// 	const [fullNameDisplay, setFullNameDisplay] = useState("");
// 	const { previewImage } = useImageContext();
// 	// const { boards } = useContext(BoardsContext);
// 	const navigate = useNavigate();
// 	const [boards, setBoards] = useState([]);

// 	useEffect(() => {
// 		const user = auth.currentUser;

// 		if (user) {
// 			setFullNameDisplay(user.displayName);
// 		}
// 		console.log(title);
// 		console.log(previewImage);
// 	}, []);

// 	useEffect(() => {
//         const fetchBoards = async () => {
//           const response = await fetch('http://localhost:3000/api/getboards', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//           }); 
//           const data = await response.json();
//           console.log('Fetched data:', data); 
//           setBoards(data.boards); 
//         };
    
//         fetchBoards();
//       }, []);



// 	return (
// 		<>
// 			<Header />
// 			<div
// 				style={{
// 					fontSize: "2vh",
// 					fontFamily: "Lausanne",
// 					color: "#000000",
// 					marginBottom: "2rem",
// 					fontWeight: "bold",
// 					marginTop: '6rem',
// 					display: 'flex',
// 					justifyContent: 'flex-start'
// 				}}
// 			>
// 				{fullNameDisplay && <h1>{fullNameDisplay}'s Vision Boards</h1>}
// 			</div>

// 			<div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
// 				{boards.map((board, index) => (
// 					<div
// 						key={index}
// 						style={{
// 							border: "1px solid #ccc",
// 							borderRadius: "8px",
// 							padding: "1rem",
// 							width: "23%",
// 							textAlign: "center",
// 						}}
// 					>
// 						<Card sx={{ width: '100%' }}>
// 							<CardActionArea onClick={() => navigate(`/${board.title}`)}>
// 								<CardMedia
// 									component="img"
// 									height="140"
// 									src={`http://localhost:3000${board.previewImage}`}
// 									alt="Preview Image"
// 								/>
// 								<CardContent>
// 									<Typography gutterBottom variant="h5" component="div">
// 										{board.title}
// 									</Typography>
// 									<Typography variant="body2" sx={{ color: "text.secondary" }}>
// 										{board.description}
// 									</Typography>
// 								</CardContent>
// 							</CardActionArea>
// 						</Card>
// 					</div>
// 				))}
// 			</div>
// 		</>
// 	);
// }

// export default AllBoards;


import Header from "./Header";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useImageContext } from "./ImageContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function AllBoards() {
	const location = useLocation();
	const { title, thumbnail } = location.state || {};
	const [fullNameDisplay, setFullNameDisplay] = useState("");
	const { previewImage } = useImageContext();
	const navigate = useNavigate();
	const [boards, setBoards] = useState([]);



	useEffect(() => {
		const user = auth.currentUser;

		if (user) {
			setFullNameDisplay(user.displayName);
		}
	}, []);

	// useEffect(() => {
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
				const response = await fetch(`http://localhost:3000/api/getboards/${userId}`, {
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
				console.log("Fetched data:", data);
				setBoards(data.boards);
			} catch (error) {
				console.error("Error fetching boards:", error);
			}
		};

		// fetchBoards();
	// }, []);


useEffect(() => {
    if (auth.currentUser) {
        fetchBoards(auth.currentUser);
    }
}, [location.pathname]);

	return (
		<>
			<Header />
			<div
				style={{
					fontSize: "2vh",
					fontFamily: "Lausanne",
					color: "#000000",
					marginBottom: "2rem",
					fontWeight: "bold",
					marginTop: "6rem",
					display: "flex",
					justifyContent: "flex-start",
				}}
			>
				{fullNameDisplay && <h1>{fullNameDisplay}'s Vision Boards</h1>}
			</div>

			<div style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
				{boards.map((board, index) => (
					<div
						key={index}
						style={{
							border: "1px solid #ccc",
							borderRadius: "8px",
							padding: "1rem",
							width: "23%",
							textAlign: "center",
						}}
					>
						<Card sx={{ width: "100%" }}>
							<CardActionArea onClick={() => navigate(`/${board.title}`)}>
								<CardMedia
									component="img"
									height="140"
									src={`http://localhost:3000${board.previewImage}`}
									alt="Preview Image"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="div">
										{board.title}
									</Typography>
									<Typography variant="body2" sx={{ color: "text.secondary" }}>
										{board.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</div>
				))}
			</div>
		</>
	);
}

export default AllBoards;
