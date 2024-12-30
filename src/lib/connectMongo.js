import mongoose from "mongoose";

const connectMongo = async () => {
    
    try {

        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Connecting MongoDB was successfully!');

    } catch(err) {

        console.log('Error connecting MongoDB', err);
        console.log('Error connecting MongoDB');

    }
};

export default connectMongo;