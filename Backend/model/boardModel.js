import mongoose, { model } from "mongoose";

const boardSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    // previewImage: {type: String, required: true}
  
})

const Board = mongoose.model("Board", boardSchema)
export default Board



// import mongoose from 'mongoose'; 

// const boardSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     // user: Reference to the User who created the board
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     }
// });

// const Board = mongoose.model("Board", boardSchema);
// export default Board;
