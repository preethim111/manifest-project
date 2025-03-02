import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./model/userModel.js";
import cors from "cors";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import Board from "./model/boardModel.js";
import multer from "multer";
import mongoose from 'mongoose';
import { logger, requestLogger } from "./logger.js"; 
import admin from "firebase-admin";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import { S3Client } from '@aws-sdk/client-s3';




const app = express();

app.use(
	cors({
		origin: ["http://localhost:5173", "https://manifest-project.vercel.app"], // Allow requests from your frontend's origin
		methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
		allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
	})
);

app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed

dotenv.config();

connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Update this to include the full URL path when serving static files
// app.use("/uploads", express.static("uploads"));

// Configure multer middleware for handling file uploads
// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "./uploads/");
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + "-" + file.originalname);
// 	},
// });

app.use(requestLogger);

app.use((req, res, next) => {
	logger.info(`Incoming request: ${req.method} ${req.url}`);
	next();
  });
  
  app.get("/", (req, res) => {
	logger.debug("Handling GET request for /");
	res.send("Hello, Winston Logging!");
  });
  
  app.use((err, req, res, next) => {
	logger.error(`Error: ${err.message}`);
	res.status(500).send("Something went wrong!");
  });


// const upload = multer({ storage: storage });


const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
	  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
  });
  
  // Configure Multer to Upload to S3
  const upload = multer({
	storage: multerS3({
	  s3,
	  bucket: process.env.S3_BUCKET_NAME,
	//   acl: 'public-read',
	  contentType: multerS3.AUTO_CONTENT_TYPE,
	  key: function (req, file, cb) {
		const filename = `vision-boards/${Date.now()}-${file.originalname}`;
		cb(null, filename);
	  },
	}),
  });


admin.initializeApp({
	credential: admin.credential.applicationDefault(),  // Use applicationDefault() for local dev credentials
  });


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
	} catch (error) {
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

// POST: Endpoint to save the vision boards
app.post(
	"/api/visionBoard",
	upload.single("uploadedPreviewImage"),
	async (req, res) => {
		console.log(req.file);
		const { title, description, userId } = req.body;
		// Create the full URL path for the image
		// const previewImage = req.file ? `/uploads/${req.file.filename}` : null;
		const previewImage = req.file ? req.file.location : null; // Store S3 URL
		try {

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
app.get("/api/getboards/:userId", async (req, res) => {
	try {
		const {userId} = req.params
        // const idToken = req.headers.authorization?.split("Bearer ")[1];

        // if (!idToken) {
        //     return res.status(401).json({ error: "Unauthorized: No token provided" });
        // }

        // // Verify the Firebase token and extract the user's UID
        // const decodedToken = await admin.auth().verifyIdToken(idToken);
        // const userId = decodedToken.uid;
		console.log("UID: ", userId);
        // Query the database for boards owned by this user
        const boards = await Board.find({ userId: userId });

        res.json({ boards });
    } catch (error) {
        console.error("Error fetching boards:", error);
        res.status(500).json({ error: "Failed to fetch boards" });
    }
});



// GET: Get specific board based on title
app.get("/api/getSpecificBoard", async(req, res) => {
	const { title } = req.body;
	try {
		const board = await Board.findOne({ title })
	} catch (error) {
		res.status(500).send({ error: error.message });
	}
})



// POST: Post images to specific board
app.post("/api/populateVisionBoard", async(req, res) => {
	const {title, images} = req.body;

	if (!title || !images || !Array.isArray(images)) {
        return res.status(400).json({ message: "Invalid input: title and images are required." });
    }

    try {
        const board = await Board.findOne({ title });

        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }

        if (!Array.isArray(board.images)) {
            board.images = [];
        }

        console.log("Before appending images:", board.images);

        const newImages = images.filter(image => !board.images.includes(image));
        board.images.push(...newImages);

        await board.save();

        console.log("After appending images:", board.images);

        res.status(200).json({ message: "Images successfully added to board", board });
    } catch (error) {
        console.error("Error in populateBoard:", error);
        res.status(500).json({ message: "Error updating image to board" });
    }
})

// GET: Get images from specific board 
app.get("/api/getImages/:title", async(req, res) => {
	try {
		const { title } = req.params;
		const board = await Board.findOne({ title })

		if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }

		res.json({ images: board.images })
	} catch (error) {
		console.error("Error fetching images:", error);
        res.status(500).json({ error: "Failed to fetch images" });
	}
})


// POST: Post AI images to specific board
app.post("/api/populateVisionBoardAI", async(req, res) => {
	const {title, imagesAI} = req.body;

	try {
		const board = await Board.findOne({ title })

		if (!Array.isArray(board.imagesAI)) {
            board.imagesAI = [];
        }

		const newImagesAI = imagesAI.filter(image => !board.images.includes(image));
        board.imagesAI.push(...newImagesAI);

		await board.save();

		res.status(200).json({ message: "AI Images successfully added to board", board });

	} catch (error) {
		console.error("Error in populateBoardAI:", error);
        res.status(500).json({ message: "Error updating AI image to board" });
	}
})


// GET: Get AI images of specific board 
app.get("/api/getAiImages/:title", async(req, res) => {
	try {
		const { title } = req.params;
		const board = await Board.findOne({ title })

		if (!board) {
            return res.status(404).json({ error: "Board not found" });
        }

		res.json({ imagesAI: board.imagesAI })

	} catch (error) {
		console.error("Error fetching AI images:", error);
		res.status(500).json({ error: "Failed to fetch AI" })
	}
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});