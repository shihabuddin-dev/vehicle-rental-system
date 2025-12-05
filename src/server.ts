import express, { Request, Response } from "express";
import initDB from "./config/db";
import logger from "./middleware/logger";
import config from "./config";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;

// parser (MiddleWare)
app.use(express.json());
// app.use(express.urlencoded())

// initializing DB
initDB();
// root
app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello Boss!");
});

// --users CRUD--
app.use("/api/v1/users", userRoutes);

// --todos CRUD--

// --AUTH--


// not found error handle
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Routes Not Found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// export default app;