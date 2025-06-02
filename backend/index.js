import dotenv from "dotenv";
dotenv.config();
console.log("1)Loaded JWT_SECRET:", JSON.stringify(process.env.JWT_SECRET));
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from'./src/config/db.js';
import { setSocketIO } from './src/socket.js'; 
import authRouter from './src/routes/auth.js';     
import userRouter from './src/routes/user.js'; 
import messageRouter from './src/routes/message.route.js'; 
import helmet from "helmet";
import rateLimit from "express-rate-limit";


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

setSocketIO(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,//10 minutes
  max: 100,
});

app.use(limiter);

app.get("/",(req,res)=>{
  res.send("Express.js is running successfully")
});

app.use('/auth',authRouter);
app.use("/users",userRouter);
app.use("/message",messageRouter);


io.on("connection", (socket) => {
  console.log("🔌 New user connected:", socket.id);

  socket.on("joinRoom", ({ senderId, receiverId }) => {
    const roomId = [senderId, receiverId].sort().join("-");
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});   

connectDB();

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


