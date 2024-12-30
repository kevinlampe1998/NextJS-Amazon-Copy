import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: [ 'seller', 'buyer' ], required: true },
    name: { type: String, required: true },
    mobileNumber: { type: String },
    email: { type: String },
    password: { type: String }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);