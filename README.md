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

server/
    ├── game/
        ├── Game.js
        └── GameManager.js
    ├── public/
        ├── img/
            └── chesspieces/
                └── wikipedia/
                    ├── bB.png
                    ├── bK.png
                    ├── bN.png
                    ├── bP.png
                    ├── bQ.png
                    ├── bR.png
                    ├── wB.png
                    ├── wK.png
                    ├── wN.png
                    ├── wP.png
                    ├── wQ.png
                    └── wR.png
        ├── libs/
            ├── chessboard-1.0.0.min.css
            └── chessboard-1.0.0.min.js
        ├── app.js
        ├── index.html
        └── style.css
    ├── utils/
        └── ids.js
    ├── index.js
    └── socket.js
package-lock.json
package.json
README.md
# Setup and run locally  
  
git clone https://github.com/Arjunnarenreddy01/Chess.git    

cd Chess  


npm install  


cd server  
node index.js  

open in browser at  
http://localhost:3000  

