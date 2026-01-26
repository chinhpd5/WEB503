import mongoose from "mongoose";  

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
},{
  timestamps: true,
  versionKey: false
})

const Category = mongoose.model("category", categorySchema);
export default Category;