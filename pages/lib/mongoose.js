import mongoose from "mongoose";

export async function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Mongo Connected");
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri).then((res) => {
      console.log("Mongo Connected");
    });
  }
}
