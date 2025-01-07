'use client';

import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronDown, Search, ShoppingCart } from 'lucide-react';
import styles from './component.module.css';
import { showSignInHoverPartnerComponent, hideSignInHoverPartnerComponent } from "../dark-overlay/component";
import { useEffect, useContext, useRef } from "react";
import { Context } from "../context-provider/component";
import { useRouter } from "next/navigation";
import domainName from "@/lib/domainName";

const Header = () => {
    const { clientDB, dispatch } = useContext(Context);
    const router = useRouter();
    const headerRef = useRef();

    const checkCookieAtStart = async () => {
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/check-cookie`, {
            credentials: 'include'
        });

        const data = await res.json();
        
        console.log('data', data);
        
        data.success && data.user.role === 'seller' &&
        dispatch({ type: 'set_seller', payload: data.user });
        data.success && data.user.role === 'buyer' &&
        dispatch({ type: 'set_buyer', payload: data.user });
    };

    useEffect(() => {
        checkCookieAtStart();
    }, []);
    
    useEffect(() => {
        clientDB.seller && (headerRef.current.style.justifyContent = 'space-between');
    }, [clientDB]);

    return (
        <header className={styles.header} ref={headerRef}>

            <Link
                href='/'
                className={styles.amazonHeaderLogoContainer}
            >
                <Image
                    src='/logos/amazon-header-logo.png'
                    width='120'
                    height='50'
                    alt="Amazon header logo"
                    priority
                />
            </Link>
            {
                clientDB.seller &&

                <div className={styles.sellerNav}>

                    <div
                        className={styles.sellerSetProductHeaderButton}
                        onClick={() => router.push('/frontend/sellers/see-my-products')}
                    >
                        See my products
                    </div>
                    <div
                        className={styles.sellerSetProductHeaderButton}
                        onClick={() => router.push('/frontend/sellers/set-product')}
                    >
                        Set a product
                    </div>
                
                </div>
    
            }

            {
                !clientDB.seller &&

                <>
                    <section>
                        <MapPin size={20}/>
                        <div>
                            <p>Deliver to</p>
                            <strong>Germany</strong>
                        </div>
                    </section>

                    <nav>
                        <button>
                            <p>All</p>
                            <ChevronDown size={20}/>
                        </button>
                        <input placeholder="Search Amazon"/>
                        <div className={styles.headerSearchButton}>
                            <Search size={20}/>
                        </div>
                    </nav>

                    <section className={styles.headerLanguage}>
                        <div>🇺🇸</div>
                        <strong>EN</strong>
                        <ChevronDown size={20}/>
                    </section>
                
                </>
            }
        
            
            <section
                className={styles.headerSignIn}
                onMouseEnter={clientDB.seller ? undefined : showSignInHoverPartnerComponent}
                onMouseLeave={clientDB.seller ? undefined : hideSignInHoverPartnerComponent}
                onClick={() =>  
                    clientDB.seller ? router.push('/frontend/sellers/profile')
                    : clientDB.buyer ? router.push('/frontend/users/profile')
                    : router.push('/frontend/users/sign-in')}
            >
                <p>
                    Hello, {
                        clientDB.seller ? clientDB.seller.name
                            : clientDB.buyer ? clientDB.buyer.name
                            :'sign in'
                    }
                </p>

                {
                    !clientDB.seller &&

                        <div>
                            <strong>Account & Lists</strong>
                            <ChevronDown size={20}/>
                        </div>

                }
            </section>

            {
                !clientDB.seller &&

                <>
                    <section
                        className={styles.signInTriangle}
                        onMouseEnter={showSignInHoverPartnerComponent}
                        onMouseLeave={hideSignInHoverPartnerComponent}
                        id="signInTriangle"
                    ></section>

                    <section
                        className={styles.signInBottomArea}
                        onMouseEnter={showSignInHoverPartnerComponent}
                        onMouseLeave={hideSignInHoverPartnerComponent}  
                    ></section>

                    <section className={styles.headerReturns}>
                            <p>Returns</p>
                            <strong>& Orders</strong>
                    </section>

                    <section className={styles.headerCart}>
                        <div>
                            <p>0</p>
                            <ShoppingCart size={20} className={styles.headerShoppingCartLogo}/>
                        </div>
                        <strong>Cart</strong>
                    </section>
                
                </>
            }


        </header>
    );
};

export default Header;