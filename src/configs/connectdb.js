import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION);
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Kết nối MongoDB thất bại', error);
  }
};

export default connectDB;