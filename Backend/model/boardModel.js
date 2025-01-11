import mongoose, { model } from "mongoose";

const boardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true}
})