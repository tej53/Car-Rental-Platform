import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import ownerRouter from "./routes/ownerRouter.js";
import bookingRouter from "./routes/bookingRouter.js";

const app = express();

//connect database
await connectDB();

//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is running");
})

app.use("/api/user", userRouter);

app.use("/api/owner", ownerRouter);

app.use("/api/booking", bookingRouter);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Server running on http://localhost:${port}`);
})