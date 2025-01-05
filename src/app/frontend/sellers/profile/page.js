'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context-provider/component';
import { useContext } from 'react';
import domainName from '@/lib/domainName';

const Profile = () => {
    const router = useRouter();
    const { clientDB, dispatch } = useContext(Context);

    const logout = async () => {
        console.log('logout function started');
        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/sellers/logout`);
        const data = await res.json();

        data.success && router.push('/');
        dispatch({ type: 'remove_seller' });
    };

    return (
        <div className={styles.sellersProfile}>
            <button onClick={logout}>Log out</button>
            
        </div>
    );
};

export default Profile;
