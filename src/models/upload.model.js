import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  }
},{
  versionKey: false,
  timestamps: true
});

const Upload = mongoose.model('upload', uploadSchema);
export default Upload;