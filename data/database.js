import mongoose from "mongoose";

export const connectDB = ()=>{



    mongoose.connect(process.env.MONGODB_URI, {
        dbName: 'backendtodo',
    })
        .then(() => console.log('Database Connected'))
        .catch((e) => console.log('Error Occured', e))

}
