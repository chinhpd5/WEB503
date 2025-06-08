import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  image: String
},{timestamps: true, versionKey: false});

const Upload = mongoose.model("Upload", uploadSchema);
export default Upload;