import styles from './component.module.css';
import { Menu } from 'lucide-react';

const Header2 = () => {
    return (
        <nav className={styles.header2}>
            <div>
                <Menu size={20} color='#fff'/>
                <p>All</p>
            </div>
            <p>Today's Deals</p>
            <p>Customer Service</p>
            <p>Registry</p>
            <p>Gift Cards</p>
            <p>Sell</p>
        </nav>
    );
};

export default Header2;
