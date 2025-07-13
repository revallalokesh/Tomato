import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    adress: { type: Object, required: true },
    status: { type: String, default: "Food Processing..." },
    payment: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() }

})

 const OrderModel = mongoose.models.OrderModel ||  new mongoose.model("order",OrderSchema);
 export default OrderModel;