'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Context } from '@/components/context-provider/component';
import domainName from '@/lib/domainName';

const SignIn = () => {
    const [ user, setUser ] = useState({
        mobileNumberOrEmail: '',
        password: ''
    });
    const router = useRouter();

    const mobileNumberOrEmailInput = useRef();
    const passwordInput = useRef();

    const mobileNumberOrEmailError = useRef();
    const passwordError = useRef();
    const responseErrorMessage = useRef();

    const { clientDB, dispatch } = useContext(Context);

    const register = async (e) => {
        e.preventDefault();

        user.mobileNumberOrEmail === '' && (mobileNumberOrEmailInput.current.style.border = '2px solid red');
        user.mobileNumberOrEmail === '' && (mobileNumberOrEmailError.current.style.display = 'flex');

        user.password === '' && (passwordInput.current.style.border = '2px solid red');
        user.password === '' && (passwordError.current.style.display = 'flex');

        if (
            user.mobileNumberOrEmail === '' ||
            user.password === ''
        ) return;



        const res = await fetch(`${process.env.NODE_ENV === 'production' ? domainName : ''}/api/users/sign-in`, {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        const data = await res.json();
        console.log('data', data);

        data.error && (responseErrorMessage.current.innerHTML = data.message);
        data.error && (responseErrorMessage.current.style.display = 'block');

        data.success && data.user.role === 'seller' &&
            dispatch({ type: 'set_seller', payload: data.user });
        data.success && data.user.role === 'buyer' &&
            dispatch({ type: 'set_buyer', payload: data.user });

        data.success && router.push('/');
    };

    const addParentPetrolBorder = (e) => {
        const parent = e.target.parentElement;
        parent.style.border = '3px solid rgb(2, 122, 110)';
    };

    const removeParentPetrolBorder = (e) => {
        const parent = e.target.parentElement;
        parent.style.border = '3px solid rgb(255, 255, 255)';
    };

    return (
        <div className={styles.register}>

            <Image
                src='/logos/amazon-logo-bg-white.png'
                width={130}
                height={50}
                style={{ width: "130px", height: '50px' }}
                alt='Amazon Logo with background white'
                // onClick={() => router.push('/')}
            />

            <div
                ref={responseErrorMessage}
                className={styles.responseErrorMessage}
            >Something went wrong</div>

            <form onSubmit={register}>

                <div>
                    <h2>Sign In</h2>

                    <label>Mobile number or email</label>


                    <div
                        className={styles.registerMobileNumberOrEmail}
                    >

                        <input
                            ref={mobileNumberOrEmailInput}
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                            value={user.mobileNumberOrEmail}
                            onChange={(e) => setUser(prev => ({ ...prev, mobileNumberOrEmail: e.target.value }))}
                        />
                    </div>

                    <div
                        className={styles.registerErrorMessage}
                        ref={mobileNumberOrEmailError}
                    >
                        <div>!</div>
                        <div>Enter your email or mobile phone number</div>
                    </div>

                    <label>Password</label>
                    <div>
                        <input
                            ref={passwordInput}
                            placeholder='At least 6 characters'
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                            value={user.password}
                            onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                        />
                    </div>


                    <div
                        className={styles.registerErrorMessage}
                        ref={passwordError}
                    >
                        <div>!</div>
                        <div>Minimum 6 characters required</div>
                    </div>

                    <p><span>i</span> Passwords must be at least 6 characters.</p>

                    <button type='submit'>Continue</button>
                </div>

                <section>
                    <p>
                        Already have an account?
                        <Link href='#'>
                            Sign in
                            <ChevronRight
                                size={12}
                                className={styles.signInChevron}
                            />
                        </Link>
                    </p>
                </section>

            </form>

            <div>
                <div>
                    <Link href='#'>Condition of use</Link>
                    <Link href='#'>Privacy Notice</Link>
                    <Link href='#'>Help</Link>
                </div>
                <p><span>c</span> 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </div>

        </div>
    );
};

export default SignIn;