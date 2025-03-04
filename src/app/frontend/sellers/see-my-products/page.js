'use client';

import { useEffect, useState, useContext } from "react";
import { Context } from "@/components/context-provider/component";
import styles from './page.module.css';
import Image from "next/image";
import { useRouter } from "next/navigation";
import domainName from "@/lib/domainName";

const SeeProducts = () => {
    const [ products, setProducts ] = useState();
    const { clientDB, dispatch } = useContext(Context);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();
    const [ resError, setResError ] = useState();

    const fetchProducts = async () => {
        console.log('sellerId fetchProducts read-all', clientDB.seller._id);

        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/products/read-all`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sellerId: clientDB.seller._id })
        });
        const data = await res.json();

        console.log('data fetchProducts', data);

        data.success && data.products.reverse();

        data.success && setProducts(data.products);
        data.success && setLoading(false);

        data.error && setLoading(false);
        data.error && setResError(true);
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
                        products && products.map(product => (
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

             {
                !loading && resError &&

                <div>Unfortunately, no products were found, or none have been uploaded yet.</div>
             }
        </div>
    );
};

export default SeeProducts;