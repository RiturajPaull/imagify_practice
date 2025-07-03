import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
const app = express();
const PORT = 3000;

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.get("/", (req, resp) => {
  resp.send("Hello");
});
app.use("/api/user", userRouter);
app.use("/api/generate", imageRouter);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at Port : ${PORT}`);
  });
});

export default app;
