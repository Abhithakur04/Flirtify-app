const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const connectionDB = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    // a lot of user send mesasages to other person now hoe backend will decide to whom send the message that why make a room in which sender and reciver is there
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);

      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, text, userId, targetUserId }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);

          //check userId and targetUserId are friends or not
          const connectionModule = await connectionDB.findOne({
            $or: [
              {
                fromUserId: userId,
                toUserId: targetUserId,
                status: "accepted",
              },
              {
                fromUserId: targetUserId,
                toUserId: userId,
                status: "accepted",
              },
            ],
          });

          if (!connectionModule) {
            throw new Error("they are not friends");
          }
          //now two cases are generated one is when the first time user send the message i.e no messages are stored in database earlier and second case when the messages are stored in the database
          let chat = await Chat.findOne({
            //give me that row in which userId and targetid are presend in the db
            participants: { $all: [userId, targetUserId] },
          });
          //for first time chat stored
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          //store the message
          chat.messages.push({ senderId: userId, text, createdAt: new Date() });
          await chat.save();
          io.to(roomId).emit("messageRecived", {
            firstName,
            lastName,
            text,
            createdAt: new Date(),
          });
        } catch (err) {
          console.log(err);
        }

       
      }
    );
    socket.on("disconnect", () => {});
  });
};
module.exports = { initializeSocket };
