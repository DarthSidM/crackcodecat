import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  courseName: string;
  courseDescription: string;
  price: number;
  cgst : number;
  sgst : number;
  status : "ACTIVE" | "INACTIVE";
}

const CourseSchema = new Schema<ICourse>({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  price: { type: Number, required: true },
  cgst : {type : Number, required: true}, 
  sgst : {type : Number, required: true}, 
  status : {type : String, required: true, default : "ACTIVE"},
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);