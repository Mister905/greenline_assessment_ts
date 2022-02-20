import { Schema, model } from "mongoose";

interface I_Product {
  company_id: string;
  name: string;
  created_at: Date;
}

const ProductSchema = new Schema<I_Product>({
  company_id: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const ProductModel = model<I_Product>("Products", ProductSchema);

export default ProductModel;
