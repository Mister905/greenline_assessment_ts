import { Schema, model } from "mongoose";

interface I_Sale {
  product: string;
  created_at: Date;
}

const SaleSchema = new Schema<I_Sale>({
  product: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const SaleModel = model<I_Sale>("Sales", SaleSchema);

export default SaleModel;
