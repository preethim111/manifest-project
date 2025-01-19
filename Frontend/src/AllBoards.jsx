import Header from "./Header";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import FileUploadArea from "./FileUpload";
import { useImageContext } from "./ImageContext";
import { useContext } from "react";
import { BoardsContext } from "./BoardsContext";
import { useNavigate } from "react-router-dom";

function AllBoards() {
	const location = useLocation();
	const { title, thumbnail } = location.state || {};
	const [fullNameDisplay, setFullNameDisplay] = useState("");
	const { previewImage } = useImageContext();
	const { boards } = useContext(BoardsContext);
	const navigate = useNavigate();

	useEffect(() => {
		const user = auth.currentUser;

		if (user) {
			setFullNameDisplay(user.displayName);
		}
		console.log(title);
		console.log(previewImage);
	}, []);

	return (
		<>
			<Header />
			<div
				style={{
					fontSize: "15px",
					fontFamily: "Lausanne",
					color: "#000000",
					paddingRight: "527px",
					marginBottom: "40px",
					fontWeight: "bold",
				}}
			>
				{fullNameDisplay && <h1>{fullNameDisplay}'s Vision Boards</h1>}
			</div>

			<div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
				{boards.map((board, index) => (
					<div
						key={index}
						style={{
							border: "1px solid #ccc",
							borderRadius: "8px",
							padding: "16px",
							width: "200px",
							textAlign: "center",
						}}
					>
						<Card sx={{ maxWidth: 345 }}>
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
