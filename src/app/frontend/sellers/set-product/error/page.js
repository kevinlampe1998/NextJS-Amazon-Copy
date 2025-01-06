'use client';

import styles from './page.module.css';

const Error = () => {

    return (
        <div className={styles.errorMessage}>
            <h3>Something went wrong!</h3>
            <p>Maybe try again</p>
        </div>
    );
};

export default Error;