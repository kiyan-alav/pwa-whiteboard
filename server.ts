import next from "next";
import cron from "node-cron";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectToDB from "./configs/db";
import Message from "./models/Message";
import Stroke from "./models/Stroke";
import User from "./models/User";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3001", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await connectToDB();
  const httpServer = createServer(handle);
  const io = new Server(httpServer);

  cron.schedule("0 0 * * *", async () => {
    try {
      await Stroke.deleteMany({});
      console.log("[cron] strokes cleared at midnight");
    } catch (error) {
      console.error("[cron] failed to clear strokes:", error);
    }
  });

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

      const populatedMsg = await msg.populate("sender");
      io.emit("new-message", populatedMsg);
    });

    // --- DRAW events (relay only) ---
    socket.on("start-draw", (meta) => {
      // meta: { strokeId, userId, tool, color, size }
      socket.broadcast.emit("drawing", meta);
    });

    socket.on("drawing", (payload) => {
      // payload: { strokeId, points: [{x,y}, ...] }
      socket.broadcast.emit("drawing", payload);
    });

    socket.on("end-draw", async (meta) => {
      try {
        const stroke = await Stroke.create({
          userId: meta.userId,
          tool: meta.tool,
          color: meta.color,
          size: meta.size,
          points: meta.points,
        });

        io.emit("stroke:saved", stroke);
      } catch (err) {
        console.error("failed to save stroke", err);
      }
    });

    socket.on("clear-board", async () => {
      await Stroke.deleteMany({});
      io.emit("board-cleared");
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
