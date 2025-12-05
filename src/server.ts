import express, { Request, Response } from "express";
const app = express();
const port = 5000;

// parser
app.use(express.json())

app.get("/", (req:Request, res:Response) => {
  res.send("Hello Boss!");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});