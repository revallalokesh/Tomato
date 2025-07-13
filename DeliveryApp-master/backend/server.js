import express from "express";
import cors from "cors";
import { connectDB } from "./configs/DBConnection.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";
const app = express();
const PORT = 4000;
connectDB();
app.use(express.json())
app.use(cors({
    origin: [
        "https://tomato-1-xng7.onrender.com", // User frontend
        "https://tomato-admin-w6dy.onrender.com" // Admin frontend
    ],
    credentials: true
}));


app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"))




app.get("/", (req, res) => {

    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})
