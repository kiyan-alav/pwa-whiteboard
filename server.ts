import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectToDB from "./configs/db";
import Message from "./models/Message";
import User from "./models/User";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3001", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("register", async (userId: string) => {
      await connectToDB();
      await User.findByIdAndUpdate(userId, { isOnline: true });
      socket.data.userId = userId;

      const users = await User.find().select(
        "_id firstName lastName email isOnline profileColor"
      );
      io.emit("users:update", users);
    });

    socket.on("send-message", async ({ userId, message }) => {
      await connectToDB();
      const msg = await Message.create({ sender: userId, message });
      console.log("msg ==========", msg);

      const populatedMsg = await msg.populate("sender");
      io.emit("new-message", populatedMsg);
    });

    socket.on("disconnect", async () => {
      console.log(`User disconnected: ${socket.id}`);
      if (socket.data.userId) {
        await connectToDB();
        await User.findByIdAndUpdate(socket.data.userId, { isOnline: false });
      }

      const users = await User.find().select(
        "_id firstName lastName email isOnline profileColor"
      );
      io.emit("users:update", users);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
});
