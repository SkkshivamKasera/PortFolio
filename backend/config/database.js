import mongoose from "mongoose";

export const connectDataBase = () => {
    mongoose.connect(process.env.CLOUD_MONGO_URI).then((c) => {
        console.log(`MongoDB connected to : ${c.connection.host}`)
    }).catch(e=>{
        console.log(e)
    })
}