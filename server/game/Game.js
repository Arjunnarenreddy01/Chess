import { Chess } from "chess.js";

export default class Game {
  constructor() {
    this.chess = new Chess();
    this.players = { white: null, black: null };
  }
  makeMove(move) {
    try {
      return this.chess.move(move);
    } catch (err) {
      return null;
    }
  }

  getResult() {
    if (!this.chess.isGameOver()) return null;

    if (this.chess.isCheckmate()) {
      // the side to move is checkmated
      return this.chess.turn() === "w" ? "black" : "white";
    }

    return "draw";
  }

  getState() {
    const gameOver = this.chess.isGameOver();
    return {
      fen: this.chess.fen(),
      turn: this.chess.turn(),
      gameOver,
      result: gameOver ? this.getResult() : null,
    };
  }
}
