import GameManager from "./game/Gamemanager.js";
import { generateRoomId } from "./utils/ids.js";

const manager = new GameManager();
export default function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("connected:", socket.id);
    socket.on("create_room", () => {
      const roomId = generateRoomId();
      const game = manager.createGame(roomId);

      socket.join(roomId);
      game.players.white = socket.id;

      socket.emit("room_created", { roomId });
      console.log(`Room created: ${roomId} by ${socket.id}`);
      socket.emit("room_joined", {
        roomId,
        color: "white",
        gameState: game.getState(),
      });
    });

    socket.on("join_room", ({ roomId }) => {
      const game = manager.getGame(roomId);
      if (!game) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      let color = null;

      socket.join(roomId);
      if (!game.players.white) {
        game.players.white = socket.id;
        color = "white";
      } else if (!game.players.black) {
        game.players.black = socket.id;
        color = "black";
      } else {
        color = "spectator";
      }
      socket.emit("room_joined", { roomId, color, gameState: game.getState() });
    });

    socket.on("move", ({ roomId, from, to, promotion }) => {
      const game = manager.getGame(roomId);
      if (!game) return;

      const turn = game.chess.turn();

      if (
        socket.id !== game.players.white &&
        socket.id !== game.players.black
      ) {
        socket.emit("invalid_move");
        return;
      }

      if (
        (turn === "w" && game.players.white !== socket.id) ||
        (turn === "b" && game.players.black !== socket.id)
      ) {
        console.log("Move rejected, not your turn:", socket.id);
        socket.emit("invalid_move");
        return;
      }

      const result = game.makeMove({ from, to, promotion: promotion || "q" });

      if (!result) {
        console.log("Invalid move rejected:", from, to);
        socket.emit("invalid_move");
        return;
      }

      console.log(`Move in room ${roomId}: ${from} to ${to}`);
      io.to(roomId).emit("state", game.getState());
    });
    socket.on("disconnect", () => {
      console.log("disconnected:", socket.id);

      for (const game of manager.games.values()) {
        let changed = false;

        if (game.players.white === socket.id) {
          game.players.white = null;
          changed = true;
        }

        if (game.players.black === socket.id) {
          game.players.black = null;
          changed = true;
        }

        if (changed) {
          io.to(game.roomId).emit("state", game.getState());
        }
      }
    });
  });
}
