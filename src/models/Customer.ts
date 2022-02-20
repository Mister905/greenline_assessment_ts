import { Schema, model } from "mongoose";

interface I_Customer {
  company_id: string;
  name: string;
  created_at: Date;
}

const CustomerSchema = new Schema<I_Customer>({
  company_id: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const CustomerModel = model<I_Customer>("Customers", CustomerSchema);

export default CustomerModel;
