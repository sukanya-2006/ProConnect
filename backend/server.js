
import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from 'dns';
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
dns.setDefaultResultOrder('ipv4first');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = express();
app.use('/uploads', express.static('uploads'));

// app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));

// app.use(cors({
//     origin: [
//         "http://localhost:3000",
//         "https://pro-connect-brown.vercel.app",
//         "https://pro-connect-k9dmfn2ej-sukanya-bhowmicks-projects.vercel.app/"
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true
// }));
app.use(cors({
    origin: function(origin, callback) {
        if (!origin || origin.endsWith('.vercel.app') || origin === 'http://localhost:3000') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"))


const start = async () => {

   const connectDB = await mongoose.connect(process.env.MONGO_URI);


   app.listen(9090, () => {
       console.log("Server is running on port 9090")
   })
} 

start();
