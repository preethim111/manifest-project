import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://pmanne:Srisairam11$@manifest-app.svp7u.mongodb.net/test?retryWrites=true&w=majority&appName=manifest-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Mongo Connected: ${conn.connection.host} ` )
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB;