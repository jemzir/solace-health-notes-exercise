import express, { Request, Response, Application } from "express";

const app: Application = express();
const PORT = 5000;



app.use(express.json()); // for parsing frontend fetches to server if needed

// static css and ts files for assets

// serving the initial index.html
app.get('/', (req: Request, res: Response) => {
  // 
});

// post message
app.post('/api', (req: Request, res: Response) => {
  // 
});

// get messages
app.get('/api', (req: Request, res: Response) => {
  // 
});

// deleting messages
app.delete('/api', (req: Request, res: Response) => {
  // 
})

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});