import { Schema, model } from "mongoose";

interface I_Product {
  company: string;
  name: string;
  created_at: Date;
}

const ProductSchema = new Schema<I_Product>({
  company: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const ProductModel = model<I_Product>("Products", ProductSchema);

export default ProductModel;
