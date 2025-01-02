    import { NextResponse } from "next/server";
    import User from "@/models/User";
    import connectMongo from "@/lib/connectMongo";
    import validator from 'validator';

    export const POST = async (req) => {
        try {

            await connectMongo();
            
            const body = await req.json();
            console.log('body', body);
            const { name, mobileNumberOrEmail, password } = body;

            const user = { name };

            const isStrongPassword = validator.isStrongPassword(password, {
                minLength: 5,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 0,
                minSymbols: 0,
            });
            console.log('isStrongPassword', isStrongPassword);

            if (!isStrongPassword) return NextResponse.json({
                message: 'Password not strong enough!', error: 1
            })
            isStrongPassword && (user.password = password);

            console.log('user', user);

            const isEmail = validator.isEmail(mobileNumberOrEmail);
            console.log('isEmail', isEmail);
            isEmail && (user.email = mobileNumberOrEmail);

            console.log('user', user);

            const isNumber = validator.isNumeric(mobileNumberOrEmail);

            return NextResponse.json({ message: 'You are successful registered!', success: 1 });

        } catch(err) {
            
            console.log('Error on POST Route /users/register', err);
            console.log('Error on POST Route /users/register');
            return NextResponse.json({ message: 'Something went wrong!', error: 1 });

        }
    };