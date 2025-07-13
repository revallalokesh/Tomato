import OrderModel from "../models/orderModell.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173"

    const stripe = new Stripe(process.env.STRIPE_KEY);
    try {
        const newOrder = new OrderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            adress: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartDate: {} })
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80

            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Fee"
                },
                unit_amount: 2 * 100 * 80

            },
            quantity: 1

        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`


        })
        return res.json({ success: true, session_url: session.url })
    }
    catch (err) {
        console.log(err.message)
        res.json({ success: false, message: "Error in Stripe" })
    }

}
const verifyOrder = async (req, res) => {
    const { success, orderId } = req.body;
    try {
        if (success == "true") {
            await OrderModel.findByIdAndUpdate(orderId, { payment: true })
            return res.json({ success: true, message: "Paid" })
        }
        else {
            console.log("error in Verify Order")
            await OrderModel.findByIdAndDelete(orderId)
            return res.json({ success: false, message: "Not Paid" })
        }
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error in Verifying Order" })

    }
}
const userOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({ userId: req.body.userId });
        return res.json({ success: true, data: orders });

    }
    catch (err) {

        console.log(err)
        return res.json({ success: false, message: "Error in User Orders Api request !" })
    }

}
const listOrders = async (req, res) => {
    try{
        const orders = await OrderModel.find({});
        res.json({success:true,data:orders});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"error In list orders !"})

    }

}
const updateStatus =  async(req,res)=>{
    try{

        await OrderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated !"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:"Error in Updateing the Status"})

    }

}

export { placeOrder, verifyOrder, userOrders ,listOrders,updateStatus};