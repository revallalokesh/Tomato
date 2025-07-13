import userModel from "../models/userModel.js"

const addToCart = async (req, res) => {
    try {

        // const { userId } = req.body;
        const userData = await userModel.findOne({_id: req.body.userId});
        let cartData = userData.cartData;

        if (!cartData[req.body.id]) {
            cartData[req.body.id] = 1;
        } else {
            cartData[req.body.id] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" })
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, message: "Erro while Adding to Cart" })

    }

}

const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.id] > 0) {
            cartData[req.body.id] -= 1
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        return res.json({ succes: true, message: "Item Removed From Cart" })
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error While Removing from Cart !" })
    }

}
const getItemsFromCart = async (req, res) => {
    try {
        // console.log(req.body.userId)
        let userData = await userModel.findById(req.body.userId);
        // console.log(userData)
        let cartData = userData.cartData;
       return res.json({success:true,cartData});

    }
    catch (Err) {
        console.log(Err.message);
       return res.json({success:false,message:"Error Geting CartItems"})

    }

}

export { addToCart, removeFromCart, getItemsFromCart }