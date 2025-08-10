import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  courseName: string;
  courseDescription: string;
  price: number;
}

const CourseSchema = new Schema<ICourse>({
  courseName: { type: String, required: true },
  courseDescription: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model<ICourse>("Course", CourseSchema);