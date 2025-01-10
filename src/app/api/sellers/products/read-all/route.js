import res from "@/lib/res";
import Product from "@/models/Product";
import Image from "@/models/Image";

export const POST = async (req) => {
    try {

        const body = await req.json();
        console.log(body);

        const { sellerId } = body;

        if (!sellerId) {
            return res({ message: 'req has undefined sellerId', error: 1 });
        }

        const products = await Product.find({ seller: sellerId })
            .populate('main_image');
        console.log('products', products);

        return res({ message: 'Here are your products!', success: 1, products });

    } catch(err) {

        console.log('Error on POST Route /api/seller/products/read-all', err);
        console.log('Error on POST Route /api/seller/products/read-all');
        return res({ message: 'Error on POST Route /api/seller/products/read-all!', error: 1 });

    }
};