import { NextResponse } from "next/server";
import Product from "@/models/Product";
import Image from "@/models/Image";
import User from "@/models/User";
import connectMongo from "@/lib/connectMongo";

export const GET = async () => {
    try {

        await connectMongo();

        const products = await Product.find()
            .populate({
                path: 'seller',
                model: 'User',
            })
            .populate({
                path: 'main_image',
                model: 'Image',
            });

        console.log('products', products);
        console.log('products');

        return NextResponse.json({ message: 'Here you have all existing products for your homepage!', success: 1, products });

    } catch(err) {

        console.log('Error on GET Route /api/home', err);
        console.log('Error on GET Route /api/home');
        return NextResponse.json({ message: 'Error on GET Route /api/home!', error: 1 });

    }
};