'use client';

import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronDown, Search, ShoppingCart } from 'lucide-react';
import styles from './component.module.css';
import { showSignInHoverPartnerComponent, hideSignInHoverPartnerComponent } from "../dark-overlay/component";

const Header = () => {

    return (
        <header className={styles.header}>

            <Link
                href=''
                className={styles.amazonHeaderLogoContainer}
            >
                <Image
                    src='/logos/amazon-header-logo.png'
                    width='120'
                    height='50'
                    alt="Amazon header logo"
                />
            </Link>
        
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
            
            <section
                className={styles.headerSignIn}
                onMouseEnter={showSignInHoverPartnerComponent}
                onMouseLeave={hideSignInHoverPartnerComponent}
            >
                <p>Hello, sign in</p>
                <div>
                    <strong>Account & Lists</strong>
                    <ChevronDown size={20}/>
                </div>
            </section>

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

        </header>
    );
};

export default Header;