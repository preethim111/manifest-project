import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/userModel.js";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import Board from "./model/boardModel.js";
import multer from "multer";
// import firebaseAdmin from './config/firebase';
// import admin from './config/firebase';

const app = express();

app.use(
	cors({
		origin: "http://localhost:5173", // Allow requests from your frontend's origin
		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
		allowedHeaders: ["Content-Type"], // Specify allowed headers
	})
);

app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed

dotenv.config();

connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Update this to include the full URL path when serving static files
app.use("/uploads", express.static("uploads"));

// Configure multer middleware for handling file uploads
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({ storage: storage });

// POST: Endpoint to authenticate user during sign-in
app.post("/api/authenticate", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		res.status(200).send({ message: "User found" });
	} catch (err) {
		res.status(500).send({ error: error.message });
	}
});

// POST: Endpoint to sign up (with hashed password)
app.post("/api/signup", async (req, res) => {
	const { email, password, fullName } = req.body;
	console.log("Received user data:", req.body);
	try {
		const hashed = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hashed, fullName });
		await user.save();
		res.status(201).json({ message: "User signed up successfully" });
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// POST: Endpoint to hash the new password after resetting
app.post("/api/reset", async (req, res) => {
	const { email, newPassword } = req.body;

	try {
		const newHashed = await bcrypt.hash(newPassword, 10);
		const user = await User.findOneAndUpdate(
			{ email },
			{ password: newHashed },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		res.status(200).json({ message: "Password successfully reset" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// POST: Endpoint to save the vision boards (not pictures, just the boards)
app.post(
	"/api/visionBoard",
	upload.single("uploadedPreviewImage"),
	async (req, res) => {
		const { title, description, userId } = req.body;
		// Create the full URL path for the image
		const previewImage = req.file ? `/uploads/${req.file.filename}` : null;

		// const token = req.headers.authorization?.split(' ')[1]; // Extract token

		// if (!token) {
		//     return res.status(403).json({ message: 'No token provided' });
		// }

		try {
			// const decoded = await admin.auth().verifyIdToken(token);
			// const userId = decoded.uid;

			const board = new Board({
				title,
				description,
				userId,
				previewImage,
			});

			await board.save();

			res.status(201).json({
				message: "Board created successfully!",
				board,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Error creating the board" });
		}
	}
);

// GET: Get all boards
app.get("/api/getboards", async (req, res) => {
	try {
		const boards = await Board.find();
		res.json({ boards });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Failed to fetch boards" });
	}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

// POST: Endpoint to save the vision boards (not pictures, just the boards)
// app.post('/api/visionBoard', async (req, res) => {
//     const { title, description } = req.body;
//     const token = req.headers.authorization?.split(' ')[1]; // Extract token

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify the token and extract user data
//         const decoded = await admin.auth().verifyIdToken(token); // You will need to implement the Firebase Admin SDK initialization
//         const userId = decoded.uid; // Get the user ID from the decoded token

//         // Create a new vision board and associate it with the user
//         const board = new Board({
//             title,
//             description,
//             user: userId  // Save the user ID to associate the board with the user
//         });

//         await board.save();

//         res.status(201).json({
//             message: 'Board created successfully!',
//             board
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error creating the board" });
//     }
// });
