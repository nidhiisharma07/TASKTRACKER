import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();

    const server = http.createServer(app);

    // 🔥 SOCKET.IO
    const io = new Server(server, {
      cors: {
        origin: "*"
      }
    });

    global.io = io;

    io.on("connection", (socket) => {
      console.log("User connected:", socket.id);
    });

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error:", error.message);
    process.exit(1);
  }
};

// ✅ Call start ONLY ONCE (outside function)
start();
