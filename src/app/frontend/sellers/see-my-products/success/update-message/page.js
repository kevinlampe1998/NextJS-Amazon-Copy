'use client';

import styles from './page.module.css';

const Success = () => {
    return (
        <div className={styles.successMessage}>
            <h3>You have successfully updated your product!</h3>
        </div>
    );
};

export default Success;