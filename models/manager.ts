import mongoose, { Schema, Document, Types } from "mongoose";
import { IRole } from "./role";

export interface IManager extends Document {
  name: string;
  phoneNumber: string;
  password: string; // hashed
  role: Types.ObjectId | IRole; // reference to Role document
}

const ManagerSchema = new Schema<IManager>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: "Role", required: false }
}, { timestamps: true });

export default mongoose.models.Manager || mongoose.model<IManager>("Manager", ManagerSchema);