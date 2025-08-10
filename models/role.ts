import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  role: string;
}

const RoleSchema = new Schema<IRole>({
  role: { type: String, required: true, unique: true }
}, { timestamps: true });

export default mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);