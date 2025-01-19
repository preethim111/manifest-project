// import React, { useState, useRef } from "react";
// import UploadIcon from "@mui/icons-material/Upload";
// import { Box, Typography, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useImageContext } from "./ImageContext";

// const FileUploadArea = ({ onUpload }) => {
//   const fileInputRef = useRef(null); // Reference for the hidden input
//   const { previewImage, setPreviewImage } = useImageContext();

//   // Trigger the hidden file input on click
//   const handleBoxClick = () => {
//     fileInputRef.current.click();
//   };

//   // Handle the file selection and create an image preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         result = reader.result
//         setPreviewImage(reader.result);
//         onUpload(result);
//       };
//       reader.readAsDataURL(file); // Read file as DataURL
//     }
//   };

//   const handleRemovePreview = () => {
//     setPreviewImage(null);
//     fileInputRef.current.value = "";

//   }

//   return (
//     <Box
//       onClick={handleBoxClick}
//       sx={{
//         border: "2px dashed #cccccc",
//         borderRadius: "12px",
//         backgroundColor: "#f9f9f9",
//         width: "100%",
//         maxWidth: "400px",
//         height: "300px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         cursor: "pointer",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       {/* Conditional Rendering */}
//       {previewImage ? (
//         <>
//         {/* Display Image Preview */}
//         <Box
//           component="img"
//           src={previewImage}
//           alt="Preview"
//           sx={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             borderRadius: "12px",
//           }}
//         />
//         {/* Remove Button */}
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation(); // Prevent triggering file input on button click
//             handleRemovePreview();
//           }}
//           sx={{
//             position: "absolute",
//             top: "10px",
//             right: "10px",
//             backgroundColor: "#ffffff",
//             borderRadius: "50%",
//             boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
//             "&:hover": {
//               backgroundColor: "#f0f0f0",
//             },
//           }}
//         >
//           <CloseIcon sx={{ fontSize: "16px", color: "#000000" }} />
//         </IconButton>
//       </>
//       ) : (
//         <>
//           <UploadIcon sx={{ fontSize: 48, color: "#666666", mb: 2 }} />
//           <Typography variant="body1" sx={{ fontFamily: "Lausanne", mb: 1 }}>
//             Choose a file or drag and drop it here
//           </Typography>
//           <Typography
//             variant="body2"
//             sx={{ fontFamily: "Lausanne", color: "#888888" }}
//           >
//             We recommend using high quality .jpg files less than 20 MB.
//           </Typography>
//         </>
//       )}
//     </Box>
//   );
// };

// export default FileUploadArea;

import React, { useRef } from "react";
import { useImageContext } from "./ImageContext";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FileUploadArea = () => {
	const { previewImage, setPreviewImage } = useImageContext();
	const fileInputRef = useRef(null);

	const handleBoxClick = () => {
		fileInputRef.current.click();
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setPreviewImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemovePreview = () => {
		setPreviewImage(null);
		fileInputRef.current.value = "";
	};

	return (
		<Box
			onClick={handleBoxClick}
			sx={{
				border: "2px dashed #cccccc",
				borderRadius: "12px",
				backgroundColor: "#f9f9f9",
				width: "100%",
				maxWidth: "400px",
				height: "300px",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				cursor: "pointer",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<input
				type="file"
				accept="image/*"
				name="uploadedPreviewImage"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>

			{previewImage ? (
				<>
					<Box
						component="img"
						src={previewImage}
						alt="Preview"
						sx={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: "12px",
						}}
					/>
					<IconButton
						onClick={(e) => {
							e.stopPropagation();
							handleRemovePreview();
						}}
						sx={{
							position: "absolute",
							top: "10px",
							right: "10px",
							backgroundColor: "#ffffff",
							borderRadius: "50%",
							boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
							"&:hover": {
								backgroundColor: "#f0f0f0",
							},
						}}
					>
						<CloseIcon sx={{ fontSize: "16px", color: "#000000" }} />
					</IconButton>
				</>
			) : (
				<>
					<UploadIcon sx={{ fontSize: 48, color: "#666666", mb: 2 }} />
					<Typography variant="body1" sx={{ fontFamily: "Lausanne", mb: 1 }}>
						Choose a file or drag and drop it here
					</Typography>
					<Typography
						variant="body2"
						sx={{ fontFamily: "Lausanne", color: "#888888" }}
					>
						We recommend using high-quality .jpg files less than 20 MB.
					</Typography>
				</>
			)}
		</Box>
	);
};

export default FileUploadArea;
