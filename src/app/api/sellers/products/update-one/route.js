import res from "@/lib/res";
import Product from "@/models/Product";

export const PUT = async (req) => {
        try {
            console.log('PUT Route /api/products/update-one is executed');

            const body = await req.json();
            console.log('body', body);

            const updatedProduct = await Product.findByIdAndUpdate(body._id, body, { new: true });

            console.log('updatedProduct', updatedProduct);

            return res({ message: 'Product successfully updated!', success: 1 });
    
        } catch(err) {
    
            console.log('Error on PUT Route /api/products/update-one', err);
            console.log('Error on PUT Route /api/products/update-one');
            return res({ message: 'Error on PUT Route /api/products/update-one!', error: 1 });
    
        }
};