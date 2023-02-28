import express, { Request, Response, Application } from "express";
import cors from "cors";
import path from "path";

import { MessageController } from "../server/controllers/messageController";

const controller: MessageController = new MessageController();

const app: Application = express();
const PORT = 5001;

app.use(cors()) // in a more production-like environment, would not use cors, rather would make a more configured access control
app.use(express.json()); // for parsing frontend fetches to server if needed

// serving the initial index.html
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});

// post message
app.post('/api', controller.postMessage, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// get messages
app.get('/api', controller.getMessages, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// deleting messages
app.delete('/api', controller.deleteMessage, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
})

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});