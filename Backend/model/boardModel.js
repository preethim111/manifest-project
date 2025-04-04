import mongoose, { model } from "mongoose";

const boardSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	previewImage: { type: String, required: true },
	userId: { type: String, required: true },
	images: { type: [String], default: [] },
	imagesAI: {type: [String], default: []}
});

const Board = mongoose.model("Board", boardSchema);
export default Board;