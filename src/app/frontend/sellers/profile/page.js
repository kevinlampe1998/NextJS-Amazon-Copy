'use client';

import styles from './page.module.css';
import { useRouter } from 'next/navigation';

const Profile = () => {
    const router = useRouter();

    const logout = async () => {
        console.log('logout function started');
        const res = await fetch('/api/sellers/logout');
        const data = await res.json();

        data.success && router.push('/');
    };

    return (
        <div className={styles.sellersProfile}>
            <div onClick={logout}>Log out</div>
            
        </div>
    );
};

export default Profile;
