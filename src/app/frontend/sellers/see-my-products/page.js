'use client';

import { useEffect, useState, useContext } from "react";
import { Context } from "@/components/context-provider/component";
import styles from './page.module.css';
import Image from "next/image";
import { useRouter } from "next/navigation";

const SeeProducts = () => {
    const [ products, setProducts ] = useState();
    const { clientDB, dispatch } = useContext(Context);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();

    const fetchProducts = async () => {
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/read-all`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sellerId: clientDB.seller._id })
        });
        const data = await res.json();

        console.log('data fetchProducts', data);

        data.success && setProducts(data.products);
        data.success && setLoading(false);
    };

    useEffect(() => {
        clientDB.seller && clientDB.seller._id && fetchProducts();
    }, [clientDB]);

    return (
        <div className={styles.seeProducts}>
            <h1>See Products</h1>

             {
                loading ? <div>... loading</div> :

                <div className={styles.products}>
                    {
                        products.map(product => (
                            <div
                                key={product._id}
                                className={styles.product}
                                onClick={() => router.push(`/frontend/sellers/see-my-products/single-product/${product._id}`)}
                            >
                                <h3>{product.product_name}</h3>
                                <Image
                                    width='200'
                                    height='200'
                                    style={{ width: '200', height: '200' }}
                                    src={product?.main_image?.url}
                                    alt={`Seller Product Image ${product.main_image?.public_id}`}
                                />
                                <p>{product.price}</p>
                            </div>
                        ))
                    }
                </div>
             }
        </div>
    );
};

export default SeeProducts;