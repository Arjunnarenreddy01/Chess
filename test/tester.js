import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected:", socket.id);

  socket.emit("create_room");
});

socket.on("room_created", ({ roomId }) => {
  console.log("room created:", roomId);

  // simulate second client joining
  const socket2 = io("http://localhost:3000");

  socket2.on("connect", () => {
    socket2.emit("join_room", { roomId });
  });

  socket2.on("room_joined", (data) => {
    console.log("room joined:", data);

    socket.emit("move", {
      roomId,
      from: "e2",
      to: "e4",
    });
  });

  socket2.on("state", (state) => {
    console.log("game state update:", state);
  });
});
