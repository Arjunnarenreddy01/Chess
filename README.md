# Chess

**♟️ Chess Room – Real-Time Multiplayer Chess**

A real-time 2-player chess game built with Node.js, Socket.IO, and chess.js, supporting private rooms where players can create or join games and play synchronously.

Moves are validated on the server, ensuring fair play and consistent game state across clients.

# Features

Create and join private chess rooms

Real-time move synchronization using WebSockets

Server-side move validation with chess.js

Turn-based enforcement (no moving out of turn)

Game state synced via FEN

Clean client–server separation

# Tech Stack

Backend: Node.js, Express, Socket.IO

Frontend: HTML, CSS, JavaScript, chessboard.js

Game Logic: chess.js

# Project Structure

<img width="866" height="968" alt="image" src="https://github.com/user-attachments/assets/82656e62-d51e-4e2c-9392-4f88be925b41" />

# Setup and run locally  
  
git clone https://github.com/Arjunnarenreddy01/Chess.git    

cd Chess  


npm install  


cd server  
node index.js  

open in browser at  
http://localhost:3000  

