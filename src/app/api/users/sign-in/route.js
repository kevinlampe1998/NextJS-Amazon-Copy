import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectMongo";
import User from "@/models/User";
import numbers from "@/lib/numbers";
import res from "@/lib/res";

export const POST = async (req) => {
    try {

        await connectMongo();

        const body = await req.json();
        console.log('body', body);

        const { mobileNumberOrEmail, password } = body;

        const isEmail = mobileNumberOrEmail.includes('@' && '.');

        const isNumber = mobileNumberOrEmail.split('').every(digit => numbers.includes(digit));

        const user = await User.findOne(
            isEmail ? { email: mobileNumberOrEmail } : { mobileNumber: mobileNumberOrEmail }
        );

        console.log('user', user);

        if (!user) {
            return NextResponse.json({ message: 'User not found!', error: 1 });
        }

        if (user.password !== password) {
            return NextResponse.json({ message: 'Wrong password!', error: 1 });
        }

        const res = NextResponse.json({ message: 'You are successful registered!', success: 1, user });

        res.cookies.set('user', user._id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60,
            path: '/',
        });

        return res;

    } catch(err) {

        console.log('Error on POST Route /api/users/sign-in', err);
        console.log('Error on POST Route /api/users/sign-in');
        return NextResponse.json({ message: 'Error on POST Route /api/users/sign-in!', error: 1 });

    }
};