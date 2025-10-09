// ws.js

const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

let clients = [];

// Export a function that receives the express app instance
const setupWsRoutes = (app) => {
  // Use app.ws directly since express-ws patches the app object
  app.ws("/subscribe", (ws, req) => {
    console.log("WS: New connection received");

    ws.on("message", msg => {
      try {
        const { token } = JSON.parse(msg);
        jwt.verify(token, secret, (err, user) => {
          if (err) {
            console.log("WS: Token verification failed for incoming message");
            return;
          }
          // Check if client is already connected to avoid duplicates
          if (!clients.some(c => c.ws === ws)) {
             clients.push({ userId: user.id, ws });
             console.log(`WS: Client added: ${user.id}`);
          }
        });
      } catch (err) {
        console.error("WS: Invalid message or JSON parse error", err);
      }
    });

    ws.on("close", () => {
      clients = clients.filter(c => c.ws !== ws);
      console.log("WS: Client disconnected");
    });
  });
};


// Export clients and the setup function
module.exports = { clients, setupWsRoutes };