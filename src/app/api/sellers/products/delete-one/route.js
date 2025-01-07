import Product from "@/models/Product";
import res from "@/lib/res";

export const DELETE = async (req) => {
    try {

        const body = await req.json();
        console.log(body);

        const { product_id } = body;
        console.log(product_id);

        const deletedProduct = await Product.findByIdAndDelete(product_id);

        return res({ message: 'Product successfully deleted!', success: 1 });

    } catch(err) {

        console.log('Error on POST Route /api/products/delete-one', err);
        console.log('Error on POST Route /api/products/delete-one');
        return res({ message: 'Error on POST Route /api/products/delete-one!', error: 1 });

    }
};
