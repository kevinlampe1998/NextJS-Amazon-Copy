'use client';

import { useState, useEffect, useContext } from 'react';
import styles from './page.module.css';
import { Context } from '@/components/context-provider/component';
import categories from '@/lib/categories';
import domainName from '@/lib/domainName';
import { useRouter } from 'next/navigation';
import correctPrice from '@/lib/correctPrice';

export default function SetProduct() {
    const [ image, setImage ] = useState(null);
    const [ imagePreview, setImagePreview ] = useState();
    const [ product, setProduct ] = useState({
        seller: '',
        seller_name: '',
        product_name: '',
        main_image: '',
        description: '',
        price: '0,00',
        condition: '',
        category: '',
        subcategory: ''
    });
    const [ imageUploaded, setImageUploaded ] = useState(false);
    const { clientDB, dispatch } = useContext(Context);
    const [ loading, setLoading ] = useState();
    const router = useRouter();

    const handlePrice = (event) => {
      setProduct(prev => ({ ...prev, price: correctPrice(event.target.value) }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImagePreview(imageURL);
        }

        if (!file) setImagePreview(null); 

        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const postImage = async (event) => {
        event.preventDefault();

        setLoading(true);
        window.scrollTo(0, 0);
    
        const response = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/images/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: image }),
        });
        const data = await response.json();
        console.log(data);
    
        data.success && setProduct(prev => ({ ...prev, main_image: data.image }));
        data.success && setImageUploaded(true);
        data.error && router.push('/frontend/sellers/set-product/error');
    };

    const uploadFullProduct = async () => {
        console.log('uploadFullProduct is executed');
        console.log('product.main_image', product.main_image);

        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/create`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify(product)
        });
        const data = await res.json();
        console.log('data in uploadFullProduct', data);

        data.success && router.push('/frontend/sellers/set-product/success');
        data.error && router.push('/frontend/sellers/set-product/error');

    };

    useEffect(() => {
        clientDB.seller && setProduct(prev => ({
            ...prev, seller: clientDB.seller, seller_name: clientDB.seller.name
        }));
    }, [clientDB]);

    useEffect(() => {
       imageUploaded && uploadFullProduct();
    }, [imageUploaded]);

    useEffect(() => {
        console.log('product', product);
    });

    return (
        <div className={styles.setProduct}>

            {
                loading ? <div>... loading</div> :
                
                <form onSubmit={postImage} className={styles.setProductForm}>

                    <h1>Set a product</h1>

                    <div>
                        <label>Product Name</label>
                        <input
                            onChange={(e) => setProduct(prev => ({ ...prev, product_name: e.target.value }))}
                            value={product.product_name}
                            required
                        />
                    </div>

                    <div>
                        <label>Image</label>
                        <input type="file" onChange={handleFileChange} required/>

                        {imagePreview && (
                            <img 
                                src={imagePreview} 
                                alt="Preview"
                            />
                        )}
                    </div>

                    <div>
                        <label>Condition</label>
                        <select id="category" name="category" value={product.condition} onChange={(e) => setProduct((prev) => ({ ...prev, condition: e.target.value }))}
                            required
                        >
                            <option value='' disabled>Choose a condition</option>
                            <option value='New'>New</option>
                            <option value='Used'>Used</option>
                        </select>
                    </div>

                    <div>
                        <label>Category</label>
                        <select id="category" name="category" value={product.category} onChange={(e) => setProduct((prev) => ({ ...prev, category: e.target.value }))}
                                required
                            >
                                <option value='' disabled>Choose a category</option>
                                {
                                    Object.keys(categories).map((option, index) => <option value={option} key={index}>{option}</option>)
                                }
                        </select>
                    </div>

                    {
                        product.category !== '' ? (

                            <div>
                                <label>Subcategory</label>
                                <select id="category" name="category" value={product.subcategory} onChange={(e) => setProduct((prev) => ({ ...prev, subcategory: e.target.value }))}
                                    required
                                >
                                    <option value='' disabled>Choose a subcategory</option>
                                    {
                                        categories[product.category].map((option, index) => <option value={option} key={index}>{option}</option>)
                                    }
                                </select>
                            </div>
                        )

                        :

                        (
                            <div>
                                <label>Subcategory</label>
                                <select id="category" name="category" value={product.subcategory} onChange={(e) => setProduct((prev) => ({ ...prev, subcategory: e.target.value }))}
                                    required
                                >
                                    <option value='' disabled>Select a main category first</option>
                                </select>
                            </div>
                        )
                    }
        
                    <div>
                        <label>Description</label>
                        <textarea required name="" id="" value={product.description} onChange={(e) => setProduct((prev) => ({ ...prev, description: e.target.value }))}></textarea>
                    </div>

                    <div>
                        <label>Price</label>
                        <input
                            required
                            type="text"
                            value={product.price}
                            onChange={handlePrice}
                        />
                    </div>

                    <button type='submit'>Submit</button>
                </form>

            }
        
        </div>
    );
}