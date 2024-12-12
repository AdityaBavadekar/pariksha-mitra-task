import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";

import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use("/api/v1", authRouter);
app.use("/api/v1/user-profile", authMiddleware, userRouter);

const port = process.env.PORT || 5080;

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`);
})