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
        console.log(name, mobileNumberOrEmail, password);

        const isEmail = mobileNumberOrEmail.includes('@' && '.');
        console.log('isEmail', isEmail);

        const isNumber = mobileNumberOrEmail.split('').every(digit => numbers.includes(digit));
        console.log('isNumber', isNumber);

        const mobileNumber = (isNumber ? mobileNumberOrEmail : ''); 
        const email = (isEmail ? mobileNumberOrEmail : '');

        const newSeller = new User({ role: 'seller', name, password, mobileNumber, countryDialingCode, email });
        console.log('newSeller', newSeller);

        const savedSeller = await newSeller.save();
        console.log('savedSeller', savedSeller);

        return NextResponse.json({ message: 'You are successful registered!', success: 1 });

    } catch(err) {

        console.log('Error on POST Route /sellers/register', err);
        console.log('Error on POST Route /sellers/register');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });

    }
};