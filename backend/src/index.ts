import http from 'http';
import { Server, Socket } from "socket.io";

const app = http.createServer();
const io = new Server(app, { cors: {
    origin: "*"
}});

let users: Record<string, { username: string }> = {}

io.on('connection', (socket) => {
  const user = users[socket.id] = { username: "" + Math.floor(Math.random() * 100) }
  socket.on("chat", (message) => {
      socket.emit("chat", `${user.username}: ${message}`)
    })
});
app.listen(3000);