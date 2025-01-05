import { NextResponse } from "next/server";

export const GET = async () => {
    try {

        const res = NextResponse.json({ message: 'You are successful logged out!', success: 1 });

        res.cookies.set("user", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: "/",
            maxAge: 0,
        });

        return res;

    } catch(err) {

        console.log('Error on POST Route /api/sellers/logout', err);
        console.log('Error on POST Route /api/sellers/logout');
        return NextResponse.json({ message: 'Error on POST Route /api/sellers/logout!', error: 1 });

    }
};