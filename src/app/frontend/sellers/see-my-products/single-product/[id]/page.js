'use client';

import { useParams } from "next/navigation";
import Image from "next/image";
import styles from './page.module.css';
import { useState, useEffect, useContext } from 'react';
import { Context } from '@/components/context-provider/component';
import categories from '@/lib/categories';
import domainName from '@/lib/domainName';
import { useRouter } from 'next/navigation';
import correctPrice from '@/lib/correctPrice';
import domainName from "@/lib/domainName";

const SingleProduct = () => {
    const { id } = useParams();
    const [ error, setError ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ product, setProduct ] = useState(null);
    const [ update, setUpdate ] = useState(false);
    const [ image, setImage ] = useState(null);
    const [ imagePreview, setImagePreview ] = useState(null);
    const [ imageUploaded, setImageUploaded ] = useState(false);
    const [ noImageUpdate, setNoImageUpdate ] = useState(false);
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

    const updateImage = async (event) => {
        event.preventDefault();

        setLoading(true);

        if (!image) {
            setNoImageUpdate(true);
            return;
        }
    
        const response = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/images/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: image, id: product.main_image._id }),
        });
        const data = await response.json();
        console.log(data);
    
        data.success && setProduct(prev => ({ ...prev, main_image: data.image }));
        data.success && setImageUploaded(true);
        data.error && router.push('../error');
    };

    const updateFullProduct = async () => {
        console.log('uploadFullProduct is executed');
        console.log('product.main_image', product.main_image);

        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/update-one`, {
            method: 'PUT', headers: { 'content-type': 'application/json' },
            body: JSON.stringify(product)
        });
        const data = await res.json();
        console.log('data in uploadFullProduct', data);

        data.success && router.push('../success/update-message');
        data.error && router.push('../error');

    };

    const fetchProduct = async () => {
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/read-one`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ product_id: id })
        });
        const data = await res.json();
        
        console.log('data fetchProduct', data);
        
        data.success && setProduct(data.product);
        data.success && setLoading(false);
        data.error && setError(true);
    }
    
    
    const deleteProductDoc = async () => {
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/delete-one`, {
            method: 'DELETE', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ product_id: product._id })
        });
        const data = await res.json();
        
        console.log('data deleteImageOfProduct', data);

        data.success && router.push('../success/delete-message');
        data.error && router.push('../error');
        
    };

    const deleteImageOfProduct = async () => {

        if (!product.main_image) {
            deleteProductDoc();
            return;
        };

        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/images/delete`, {
            method: 'DELETE', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ public_id: product.main_image.public_id })
        });
        const data = await res.json();

        console.log('data deleteImageOfProduct', data);

        data.success && deleteProductDoc();
        data.imageDocDoesNotExistAlready && deleteProductDoc();
        data.error && router.push('../error');
    };
    
    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        (imageUploaded || noImageUpdate) && updateFullProduct();
     }, [imageUploaded, noImageUpdate]);

    return (
        <div className={styles.productPage}>
            {
                error ?

                    <div>Something went wrong!</div>


                    : loading

                    ?  <div>... loading</div>

                    : (update && product)

                    ? 

                    (
                        <form onSubmit={updateImage} className={styles.setProductForm}>

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
                                <input type="file" onChange={handleFileChange}/>
        
                                {imagePreview ? 
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview"
                                    />

                                    :

                                    <Image
                                    width='300'
                                    height='300'
                                    style={{ width: '300px', height: '300px' }}
                                    src={product?.main_image?.url}
                                    alt={`Single product image with products name ${product.product_name}`}
                                    />
                                }
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
                    )

                    : product

                    ?

                    (
                        <div className={styles.product}>
                            <h2>{product.product_name}</h2>
                            <Image
                                width='300'
                                height='300'
                                style={{ width: '300px', height: '300px' }}
                                src={product?.main_image?.url}
                                alt={`Single product image with products name ${product.product_name}`}
                            />
                            <h4>{'c'.toUpperCase()}ondition:</h4>
                            <p>{product.condition}</p>
                            <h4>{'c'.toUpperCase()}ategory:</h4>
                            <p>{product.category}</p>
                            <h4>{'s'.toUpperCase()}ubcategory:</h4>
                            <p>{product.subcategory}</p>
                            <h4>{'d'.toUpperCase()}escription:</h4>
                            <p>{product.description}</p>
                            <h4>{'p'.toUpperCase()}rice:</h4>
                            <p>{product.price}</p>
                            
                            <div className={styles.changeAndDeleteButtons}>
                                <button onClick={() => setUpdate(true)}>Change</button>
                                <button onClick={deleteImageOfProduct}>Delete</button>
                            </div>
                        </div>
                    )

                    : <div>Something went wrong!</div>
            }
        </div>
    );
};

export default SingleProduct;