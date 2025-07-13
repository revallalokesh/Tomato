import express from "express";
import authMiddleWare from "../middlewares/authMiddleWare.js";
import { addToCart,getItemsFromCart,removeFromCart, } from "../controllers/routeController.js";
 const cartRouter = express.Router();

cartRouter.post("/addItem",authMiddleWare,addToCart);
cartRouter.post("/removeItem",authMiddleWare,removeFromCart);
cartRouter.post("/getItems",authMiddleWare,getItemsFromCart)


export default cartRouter;