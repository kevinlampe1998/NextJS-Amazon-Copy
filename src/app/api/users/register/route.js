import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import User from "@/models/User";
import numbers from "@/lib/numbers";

export const POST = async (req) => {
    try {

        await connectMongo();

        const body = await req.json();
        console.log('body', body);

        const { name, mobileNumberOrEmail, countryDialingCode, password } = body;

        const isEmail = mobileNumberOrEmail.includes('@' && '.');

        const isNumber = mobileNumberOrEmail.split('').every(digit => numbers.includes(digit));

        const mobileNumber = (isNumber ? mobileNumberOrEmail : ''); 
        const email = (isEmail ? mobileNumberOrEmail : '');

        const newBuyer = new User({ role: 'buyer', name, password, mobileNumber, countryDialingCode, email });

        const buyer = await newBuyer.save();

        buyer.password = undefined;

        const res = NextResponse.json({ message: 'You are successful registered!', success: 1, buyer });

        res.cookies.set('user', buyer._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        });

        return res;

    } catch(err) {

        console.log('Error on POST Route /sellers/register', err);
        console.log('Error on POST Route /sellers/register');
        return NextResponse.json({ message: 'Error on POST Route /sellers/register!', error: 1 });

    }
};