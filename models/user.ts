import mongoose, { Schema, Document, Types } from "mongoose";
import { ICourse } from "./course"; 
import { IRole } from "./role"; // Import the IRole interface

export interface IUser extends Document {
  phoneNumber: string;
  name: string;
  password: string; // hashed
  coursesRegistered: Types.ObjectId[] | ICourse[]; // references to Course documents
  role: Types.ObjectId | IRole; // reference to Role document
}

const UserSchema = new Schema<IUser>({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  coursesRegistered: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  role: { type: Schema.Types.ObjectId, ref: "Role", required: false }, // Add role reference
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);