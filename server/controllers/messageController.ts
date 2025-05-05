import {NextFunction} from "express";

const Message = mongoose.model('Message');

exports.getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
}

exports.createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  }
}