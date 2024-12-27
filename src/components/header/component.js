'use client';

import Link from "next/link";
import Image from "next/image";
import { MapPin } from 'lucide-react';

const Header = () => {
    return (
        <header>

            <Link href=''>
                <Image src='/logos/amazon-header-logo.png' width='200' height='100'/>
            </Link>
        
            <section>
                <MapPin size={20}/>
                <div>
                    <p>Deliver to</p>
                    <p>Germany</p>
                </div>
            </section>

        </header>
    );
};

export default Header;