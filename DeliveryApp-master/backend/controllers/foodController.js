import foodModel from "../models/foodModel.js";
import fs from "fs"

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ success: false, message: "Image is required" });
    }
    const { name, description, price, category } = req.body;
    const image_filename = req.file.filename;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename
    });

    try {
        await food.save();
        return res.status(201).send({ success: true, message: "Food Added" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ success: false, message: "Error happened while adding food item" });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.send({ success: true, data: foods })
    }
    catch (err) {
        console.log(err.message)
        res.send({ success: false, message: "Error while listing the food items" })

    }
}

const removeFoodItem = async (req, res) => {
    try {
        const foodItem = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.image}`, () => {

        })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })

    }
    catch (Err) {
        console.log(Err.message)
        return res.json({ success: false, message: "Error happend while Deleting file" })
    }
}
export { addFood, listFood, removeFoodItem };
