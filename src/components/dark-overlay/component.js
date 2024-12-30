'use client';
import styles from './component.module.css';
import { useRouter } from 'next/navigation';

export const showSignInHoverPartnerComponent = () => {
    const partnerComponent = document.querySelector('#signInHover');
    const darkness = document.querySelector('#darkness');
    const signInTriangle = document.querySelector('#signInTriangle');
    partnerComponent.style.display = 'block';
    darkness.style.display = 'block';
    signInTriangle.style.display = 'block';
};

export const hideSignInHoverPartnerComponent = () => {
    const partnerComponent = document.querySelector('#signInHover');
    const darkness = document.querySelector('#darkness');
    const signInTriangle = document.querySelector('#signInTriangle');
    partnerComponent.style.display = 'none';
    darkness.style.display = 'none';
    signInTriangle.style.display = 'none';
};

const DarkOverlay = () => {
  const router = useRouter();

    return (
      <div className={styles.darkOverlay}>
        <div className={styles.darkness} id='darkness'></div>

        <div
            className={styles.signInHover}
            id='signInHover'
            onMouseEnter={showSignInHoverPartnerComponent}
            onMouseLeave={hideSignInHoverPartnerComponent}
        >
          <div>
            <button>Sign In</button>
            <a>New Costumer? <span onClick={(e) => (e.preventDefault(), router.push('/pages/users/register'))}>Start here.</span></a>
          </div>
          <div>
            <div>
              <h4>Your Lists</h4>
              <p>Create a List</p>
              <p>Find a List or Registry</p>
            </div>
            <div>
              <h4>Your Account</h4>
              <p>Account</p>
              <p>Orders</p>
              <p>Recommendations</p>
              <p>Browsing History</p>
              <p>Watchlist</p>
              <p>Video Purchases & Rentals</p>
              <p>Kindle Unlimited</p>
              <p>Content & Devices</p>
              <p>Subscribe & Save Items</p>
              <p>Membership & Subscriptions</p>
              <p>Music & Library</p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>

      </div>
    );
};

export default DarkOverlay;