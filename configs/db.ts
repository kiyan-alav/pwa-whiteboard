import mongoose from "mongoose";

const connectToDB = async function () {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      console.log(process.env.MONGO_URL);
      
      await mongoose.connect(process.env.MONGO_URL as string);
      console.log("Connect To DB Successfully :))");
    }
  } catch (error) {
    console.log("DB Connection Error", error);
  }
};

export default connectToDB;
