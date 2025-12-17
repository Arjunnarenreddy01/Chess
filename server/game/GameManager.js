import Game from "./Game.js";

export default class GameManager {
  constructor() {
    this.games = new Map();
  }
  createGame(gameId) {
    const game = new Game();
    this.games.set(gameId, game);
    return game;
  }
  getGame(gameId) {
    return this.games.get(gameId);
  }
  deleteGame(gameId) {
    this.games.delete(gameId);
  }
}
