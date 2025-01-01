import { NextResponse } from "next/server";

export const Post = async () => {
    try {

        return NextResponse.json({ message: 'You are successful registered!', success: 1 });

    } catch(err) {

        console.log('Error on POST Route /sellers/register', err);
        console.log('Error on POST Route /sellers/register');
        return NextResponse.json({ message: 'Something went wrong!', error: 1 });

    }
};