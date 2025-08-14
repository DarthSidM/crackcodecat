import mongoose, { Schema, Document, Types } from "mongoose";
import { ICourse } from "./course"; // this import ensures registration
import { IRole } from "./role";

export interface IUser extends Document {
  phoneNumber: string;
  name: string;
  password: string;
  coursesRegistered: Types.ObjectId[] | ICourse[];
  role: Types.ObjectId | IRole;
}

const UserSchema = new Schema<IUser>({
  phoneNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  coursesRegistered: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  role: { type: Schema.Types.ObjectId, ref: "Role", required: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);