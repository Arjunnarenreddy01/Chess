import express from "express";
import http from "http";
import { Server } from "socket.io";
import registerSocketHandlers from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

registerSocketHandlers(io);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
