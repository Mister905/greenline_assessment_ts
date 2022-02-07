import { Schema, model } from "mongoose";

interface I_Company {
  name: string;
  created_at: Date;
}

const CompanySchema = new Schema<I_Company>({
  name: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const CompanyModel = model<I_Company>("Companies", CompanySchema);

export default CompanyModel;
