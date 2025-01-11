import res from "@/lib/res";
import Product from "@/models/Product";
import Image from "@/models/Image";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {

        const body = await req.json();
        console.log(body);

        const { sellerId } = body;
        console.log('sellerId', sellerId);

        if (!sellerId) {
            console.log('req has undefined sellerId');
            return NextResponse.json({ message: 'req has undefined sellerId', error: 1 });
        }

        const products = await Product.find({ seller: sellerId })
            .populate('main_image');
        console.log('products', products);

        if (!products[0]) {
            console.log('No products found!');
            return NextResponse.json({ message: 'No products found!', error: 1 });
        }

        return NextResponse.json({ message: 'Here are your products!', success: 1, products });

    } catch(err) {

        console.log('Error on POST Route /api/seller/products/read-all', err);
        console.log('Error on POST Route /api/seller/products/read-all');
        return NextResponse.json({ message: 'Error on POST Route /api/seller/products/read-all!', error: 1 });

    }
};