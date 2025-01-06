import res from "@/lib/res";
import Product from "@/models/Product";

export const POST = async (req) => {
        try {

            const body = await req.json();
            console.log(body);

            const newProduct = new Product(body);
            console.log('newProduct', newProduct);

            const savedProduct = await newProduct.save();
    
            return res({ message: 'Product successfully saved!', success: 1 });
    
        } catch(err) {
    
            console.log('Error on POST Route /api/products/create', err);
            console.log('Error on POST Route /api/products/create');
            return res({ message: 'Error on POST Route /api/products/create!', error: 1 });
    
        }
};