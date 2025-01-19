import Header from "./Header";
import React, { useContext, useState } from "react";
import { HeaderContext } from "./HeaderContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FileUploadArea from "./FileUpload";
import { useNavigate } from "react-router-dom";
import { BoardsContext } from "./BoardsContext";
import { useImageContext } from "./ImageContext";
// import firebase from 'firebase/app';
// import 'firebase/auth';

function CreateBoard() {
	const { isCreateClicked } = useContext(HeaderContext);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const navigate = useNavigate();
	const { addBoard } = useContext(BoardsContext);
	const { previewImage } = useImageContext();
	const [thumbnail, setThumbnail] = useState(null);
	// const [isClicked, setIsClicked] = useState(false)

	const handleCreateClick = async () => {
		if (title) {
			const newBoard = { title, previewImage, description };
			addBoard(newBoard);
			navigate(`/all-boards`, {
				state: { title, thumbnail },
			});
			// setIsClicked(true)
		} else {
			alert("Please provide a title for you board");
		}

		try {
			// Convert base64 to File object
			const base64Response = await fetch(previewImage);
			const blob = await base64Response.blob();
			const file = new File([blob], "preview.jpg", { type: "image/jpeg" });

			// Create FormData object
			const formData = new FormData();
			formData.append("title", title);
			formData.append("description", description);
			formData.append("uploadedPreviewImage", file);

			const response = await fetch("http://localhost:3000/api/visionBoard", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				alert("Failed to create board!");
			}

			const data = await response.json();
			console.log("Success:", data);
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			<Header />
			<div
				style={{
					fontSize: "40px",
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
						marginRight: "60px",
						marginLeft: "146px",
					}}
				>
					<FileUploadArea onUpload={setThumbnail} />
				</div>

				<div style={{ flex: "1" }}>
					<div style={{ marginBottom: "20px" }}>
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
									width: "600px",
								},
							}}
							sx={{
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
									width: "600px",
								},
							}}
							sx={{
								"& .MuiInputLabel-root": {
									fontFamily: "Lausanne",
									fontWeight: "bold",
								},
							}}
						/>
					</div>
				</div>
			</div>

			<div style={{ marginTop: "50px", position: "relative", left: "-358px" }}>
				<Button
					variant="contained"
					sx={{
						width: "150px",
						height: "54px",
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
