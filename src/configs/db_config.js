import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/WD20308');
    console.log('Kết nối MongoDB thành công');
  } catch (error) {
    console.error('Kết nối MongoDB thất bại', error);
  }
};

export default connectDB;