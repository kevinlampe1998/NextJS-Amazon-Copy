import { NextResponse } from "next/server";
import res from "@/lib/res";
import connectMongo from "@/lib/connectMongo";
import User from "@/models/User";

export const GET = async (req) => {
    try {

        await connectMongo();

        const userCookie = req.cookies.get('user');
        console.log('userCookie', userCookie);
        
        if (!userCookie) {
            return res({ message: 'userCookie is undefined!', error: 1 });
        }

        const searchedUser = await User.findOne({ _id: userCookie.value });
        console.log('searchedUser', searchedUser);

        if (!searchedUser)
            return res({ message: '/api/checkCookie no user found!', error: 1 });

        searchedUser.password = undefined;

        return res({ message: 'Checking cookies successful', success: 1, user: searchedUser });

    } catch(err) {

        console.log('Error on POST Route /api/checkCookie', err);
        console.log('Error on POST Route /api/checkCookie');
        return res({ message: 'Error on POST Route /api/checkCookie!', error: 1 });

    }
};