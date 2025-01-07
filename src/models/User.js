import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: { type: String, enum: [ 'seller', 'buyer' ], required: true },
    name: { type: String, required: true, unique: true },
    mobileNumber: { type: String },
    countryDialingCode: { type: String },
    email: { type: String },
    password: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);