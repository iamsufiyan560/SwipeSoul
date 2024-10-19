import Message from "../models/Message.js";
import { getConnectedUsers, getIO } from "../socket/socket.server.js";

export const sendMessage = async (req, res) => {
  try {
    const { content, receiverId } = req.body;

    const newMessage = await Message.create({
      sender: req.user.id,
      receiver: receiverId,
      content,
    });

    const io = getIO();
    const connectedUsers = getConnectedUsers();
    const receiverSocketId = connectedUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        message: newMessage,
      });
    }

    res.status(201).json({
      success: true,
      message: newMessage,
    });
  } catch (error) {
    console.log("Error in sendMessage: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getConversation = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 50 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Message.countDocuments({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    });

    res.status(200).json({
      success: true,
      messages: messages.reverse(), // Reverse to maintain chronological order
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      hasMore: skip + messages.length < total,
    });
  } catch (error) {
    console.log("Error in getConversation: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const getConversation = async (req, res) => {
//   const { userId } = req.params;
//   try {
//     const messages = await Message.find({
//       $or: [
//         { sender: req.user._id, receiver: userId },
//         { sender: userId, receiver: req.user._id },
//       ],
//     }).sort("createdAt");

//     res.status(200).json({
//       success: true,
//       messages,
//     });
//   } catch (error) {
//     console.log("Error in getConversation: ", error);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
