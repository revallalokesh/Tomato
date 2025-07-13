import express from "express";
import authMiddleWare from "../middlewares/authMiddleWare.js";
import { placeOrder, verifyOrder ,userOrders, listOrders, updateStatus} from "../controllers/OrderController.js";

const orderRouter  = new express.Router();
orderRouter.post("/placeOrder",authMiddleWare,placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userOrders",authMiddleWare,userOrders);
orderRouter.get("/listOrders",listOrders);
orderRouter.post("/status",updateStatus);
export default orderRouter;