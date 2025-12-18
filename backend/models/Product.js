import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String,
  description: String,
  category: {
    type: String,
    enum: ["Analog", "Digital", "Smartwatch"]
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex"]
  },
  strapType: String,
  inStock: Boolean
});


export default mongoose.model("Product", productSchema);
