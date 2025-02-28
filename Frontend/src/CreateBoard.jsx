import Header from "./Header";
import React, { useContext, useState } from "react";
import { HeaderContext } from "./HeaderContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploadArea from "./FileUpload";
import { useNavigate } from "react-router-dom";
import { BoardsContext } from "./BoardsContext";
import { useImageContext } from "./ImageContext";
import { getAuth } from "firebase/auth";

// import firebase from 'firebase/app';
// import 'firebase/auth';

function CreateBoard() {
	const { isCreateClicked } = useContext(HeaderContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [counter, setCounter] = useState(0);
	const navigate = useNavigate();
	const { addBoard } = useContext(BoardsContext);
	const { previewImage } = useImageContext();
	const [thumbnail, setThumbnail] = useState(null);
	// const [isClicked, setIsClicked] = useState(false)
	
	const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

	const handleCreateClick = async () => {
		if (!title) {
			alert("Please provide a title for your board");
		}

		try {
			// Convert base64 to File object
			const auth = getAuth();
			const user = auth.currentUser;

			if (!user) {
				alert("User not authenticated.");
				return;
			  }
			  const idToken = await user.getIdToken(); // Get the ID token from Firebase
			  const userId = user.uid;


			const base64Response = await fetch(previewImage);
			const blob = await base64Response.blob();
			const file = new File([blob], "preview.jpg", { type: "image/jpeg" });

		

			// Create FormData object
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("uploadedPreviewImage", file);
			formData.append("userId", userId);

			const response = await fetch(`${BACKEND_URL}/api/visionBoard`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${idToken}`, // Pass the ID token
				  },
				body: formData,
			});

			if (!response.ok) {
				alert("Failed to create board!");
			}

			const data = await response.json();
			console.log("Success:", data);
			setCounter(counter+1)
			const newBoard = {
				title: data.title, 
				previewImage: data.previewImage,
				description: data.description,
			};
			addBoard(newBoard);
			navigate(`/all-boards`, {
				state: { title, thumbnail: data.previewImage },
			});
			
		} catch (error) {
			console.error(error.message);
		}
		
	};

	return (
		<>
			<Header />
			<div
				style={{
					fontSize: "5vh",
					fontFamily: "Lausanne",
					color: "#000000",
					paddingRight: "527px",
					marginBottom: "40px",
					fontWeight: "bold",
				}}
			>
				Create Vision Board
			</div>
			<div style={{ display: "flex" }}>
				{/* File Upload Area */}
				<div
					style={{
						flex: "0 0 300px",
						marginLeft: "0.5rem",
					}}
				>
					<FileUploadArea onUpload={setThumbnail} />
				</div>

				<div style={{ display: "flex", flex: "1", flexDirection: "column" }}>
					<div style={{ marginBottom: "1.5rem" }}>
						<TextField
							id="title"
							label="Title"
							variant="outlined"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							InputProps={{
								sx: {
									borderRadius: "22px",
									fontFamily: "Lausanne",
									borderWidth: "40px",
									boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
									width: "100%",
								},
							}}
							sx={{
								width: {
									xs: "100%", // Full width on small screens
									sm: "80%",  // 80% of the container on small to medium screens
									md: "60%",  // 60% of the container on medium screens
									lg: "50%",  // 50% of the container on large screens
								  },
								"& .MuiInputLabel-root": {
									fontFamily: "Lausanne",
									fontWeight: "bold",
								},
							}}
						/>
					</div>
					<div>
						<TextField
							id="description"
							label="Description"
							variant="outlined"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							multiline
							rows={4}
							InputProps={{
								sx: {
									borderRadius: "22px",
									fontFamily: "Lausanne",
									borderWidth: "40px",
									boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
									width: "100%",
								},
							}}
							sx={{
								width: {
									xs: "100%", // Full width on small screens
									sm: "80%",  // 80% of the container on small to medium screens
									md: "60%",  // 60% of the container on medium screens
									lg: "50%",  // 50% of the container on large screens
								  },
								"& .MuiInputLabel-root": {
									fontFamily: "Lausanne",
									fontWeight: "bold",
								},
							}}
						/>
					</div>
				</div>
			</div>

			<div style={{ marginTop: "2.5rem", position: "relative",  display: 'flex', justifyContent: 'flex-start',}}>
				<Button
					variant="contained"
					sx={{
						width: "18%",
						padding: "1rem",
						color: "#FFFFFF",
						borderColor: "#000000",
						backgroundColor: "#481883",
						borderRadius: "30px",
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
