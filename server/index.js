import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);
})


server.listen(8000, () => {
  console.log("Server is listining on port 8000");
});
