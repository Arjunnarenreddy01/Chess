console.log("App.js loaded");

const socket = io();

let board = null;
let roomId = null;
let lastFen = "start";
let myColor = null;

board = Chessboard("board", {
  draggable: true,
  position: "start",
  onDrop: onDrop,
});

socket.on("connect", () => {
  console.log("connected:", socket.id);
});

function createRoom() {
  socket.emit("create_room");
  console.log("Emitted create_room");
}

function joinRoom() {
  const roomIdInput = document.getElementById("roomIdInput").value.trim();
  if (!roomIdInput) {
    alert("Please enter a room ID");
    return;
  }
  socket.emit("join_room", { roomId: roomIdInput });
}

socket.on("room_created", (data) => {
  roomId = data.roomId;
  console.log("Room:", roomId);
  document.getElementById("roomText").textContent = `Room ID: ${roomId}`;
  document.getElementById("statusText").textContent = "Waiting for opponent…";
});

socket.on("room_joined", (data) => {
  roomId = data.roomId;
  myColor = data.color;
  board.orientation(myColor);
  console.log(`Joined room ${roomId} as ${myColor}`);
  document.getElementById("roomText").textContent = `Room ID: ${roomId}`;
  if (myColor === "spectator") {
    board.draggable = false;
  }

  board.position(data.gameState.fen);
});

socket.on("state", (state) => {
  lastFen = state.fen;
  board.position(state.fen);
  board.draggable = state.turn === myColor;
  if (state.gameOver) {
    if (state.result === "white") {
      alert("White wins");
    } else if (state.result === "black") {
      alert("Black wins");
    } else {
      alert(state.result);
    }
  }
  console.log("Game state updated:", state);
  let currcolor = state.turn === "w" ? "white" : "black";
  if (currcolor === myColor) {
    document.getElementById("statusText").textContent = "Your move";
  } else {
    document.getElementById("statusText").textContent = "Opponent thinking…";
  }
});

socket.on("invalid_move", () => {
  board.position(lastFen); // re-sync just in case
});

function onDrop(source, target) {
  if (target === "offboard") return "snapback";
  if (!roomId || !myColor) return "snapback";

  socket.emit("move", { roomId, from: source, to: target, promotion: "q" });
  return "snapback";
}
