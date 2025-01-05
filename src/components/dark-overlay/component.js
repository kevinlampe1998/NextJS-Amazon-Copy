'use client';
import styles from './component.module.css';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Context } from '../context-provider/component';

export const showSignInHoverPartnerComponent = () => {
    const partnerComponent = document.querySelector('#signInHover');
    const signInTriangle = document.querySelector('#signInTriangle');
    const darkOverlay = document.querySelector('#darkOverlay');
    darkOverlay.style.zIndex = '100';
    signInTriangle.style.display = 'block';
    partnerComponent.style.zIndex = '110';
};

export const hideSignInHoverPartnerComponent = () => {
    const partnerComponent = document.querySelector('#signInHover');
    const signInTriangle = document.querySelector('#signInTriangle');
    const darkOverlay = document.querySelector('#darkOverlay');
    darkOverlay.style.zIndex = '-100';
    signInTriangle.style.display = 'none';
    partnerComponent.style.zIndex = '-110';
};

const DarkOverlay = () => {
  const router = useRouter();
  const { clientDB, dispatch } = useContext(Context);

    return (
      <div className={styles.darkOverlay} id='darkOverlay'>
        <div className={styles.darkness} id='darkness'></div>

        <div
            className={styles.signInHover}
            id='signInHover'
            onMouseEnter={showSignInHoverPartnerComponent}
            onMouseLeave={hideSignInHoverPartnerComponent}
        >

          {
            clientDB.buyer ?

              <div>
                <button onClick={() => router.push('/frontend/users/profile')}>Profile</button>
              </div>

              :

              <div>
                <button onClick={() => router.push('/frontend/users/sign-in')}>Sign In</button>
                <a>New Costumer? <span onClick={(e) => (e.preventDefault(), router.push('/frontend/users/register'))}>Start here.</span></a>
              </div>

          }

          {
            !clientDB.seller && !clientDB.buyer &&
              
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
                </div>
              </div>
          }


        </div>

      </div>
    );
};

export default DarkOverlay;