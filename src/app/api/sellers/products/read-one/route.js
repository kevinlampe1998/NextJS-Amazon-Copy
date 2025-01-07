import res from "@/lib/res";
import Product from "@/models/Product";
import Image from "@/models/Image";

export const POST = async (req) => {
    try {

        const body = await req.json();
        console.log(body);

        const { product_id } = body;

        const product = await Product.findById(product_id)
            .populate('main_image');
        console.log('product', product);

        return res({ message: 'Here is your product!', success: 1, product });

    } catch(err) {

        console.log('Error on POST Route /api/seller/products/read-one', err);
        console.log('Error on POST Route /api/seller/products/read-one');
        return res({ message: 'Error on POST Route /api/seller/products/read-one!', error: 1 });

    }
};