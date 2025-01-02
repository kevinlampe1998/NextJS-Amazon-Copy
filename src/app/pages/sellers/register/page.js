'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import numbers from '@/lib/numbers';
import countryDialingCodes from '@/lib/countryDialingCodes';

const USData = countryDialingCodes.filter(country => country.country === 'United States')[0];

const Register = () => {
    const [ user, setUser ] = useState({
        name: '',
        mobileNumberOrEmail: '',
        countryDialingCode: '',
        password: ''
    });
    const [ reEnterPassword, setReEnterPassword ] = useState('');
    const [ isNumber, setIsNumber ] = useState(false);
    const countryList = useRef();
    const [ selectedCountryForMobileNumber, setSelectedCountry ] = useState();

    const nameInput = useRef();
    const mobileNumberOrEmailInput = useRef();
    const passwordInput = useRef();
    const reEnterPasswordInput = useRef();

    const nameError = useRef();
    const mobileNumberOrEmailError = useRef();
    const passwordError = useRef();
    const reEnterPasswordError = useRef();

    const register = async (e) => {
        e.preventDefault();

        console.log('nameInput',nameInput);
        user.name === '' && (nameInput.current.style.border = '2px solid red');
        user.name === '' && (nameError.current.style.display = 'flex');

        user.mobileNumberOrEmail === '' && (mobileNumberOrEmailInput.current.style.border = '2px solid red');
        user.mobileNumberOrEmail === '' && (mobileNumberOrEmailError.current.style.display = 'flex');

        user.password === '' && (passwordInput.current.style.border = '2px solid red');
        user.password === '' && (passwordError.current.style.display = 'flex');

        console.log('reEnterPasswordInput.current.value', reEnterPasswordInput.current.value);

        user.password !== reEnterPasswordInput.current.value && (reEnterPasswordInput.current.style.border = '2px solid red');
        user.password !== reEnterPasswordInput.current.value && (reEnterPasswordError.current.style.display = 'flex')


        if (
            user.name === '' ||
            user.mobileNumberOrEmail === '' ||
            user.password === '' ||
            user.password !== reEnterPasswordInput.current.value
        ) return;

        user.countryDialingCode = selectedCountryForMobileNumber;

        const res = await fetch('/api/sellers/register', {
            method: 'POST', headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        const data = await res.json();
        console.log('data', data);
    };

    const addParentPetrolBorder = (e) => {
        const parent = e.target.parentElement;
        parent.style.border = '3px solid rgb(2, 122, 110)';
    };

    const removeParentPetrolBorder = (e) => {
        const parent = e.target.parentElement;
        parent.style.border = '3px solid rgb(255, 255, 255)';
    };

    const showCountryList = () => {
        countryList.current.style.display = 'block';
    };

    const changeDialingCode = (countryCode) => {
        setSelectedCountry(countryCode);
        countryList.current.style.display = 'none';
    };

    useEffect(() => {
        
        setIsNumber(user.mobileNumberOrEmail.split('').every(digit => numbers.includes(digit)));
        user.mobileNumberOrEmail === '' && setIsNumber(false);

    }, [user.mobileNumberOrEmail]);

    
    useEffect(() => {
        setIsNumber(false);
        
        setSelectedCountry(`${USData.code} ${USData.dialCode}`);
        
    }, []);
    
    useEffect(() => {
        selectedCountryForMobileNumber && console.log(selectedCountryForMobileNumber);
    }, [selectedCountryForMobileNumber]);
    
    useEffect(() => {}, [user.mobileNumberOrEmail]);
    
    useEffect(() => {
        console.log('selectedCountryForMobileNumber', selectedCountryForMobileNumber);
    }, [selectedCountryForMobileNumber]);
    
    useEffect(() => {
        !isNumber && setSelectedCountry('');
    }, [isNumber]);

    return (
        <div className={styles.register}>

            <Image
                src='/logos/amazon-logo-bg-white.png'
                width={130}
                height={50}
                style={{ width: "auto" }}
                alt='Amazon Logo with background white'
            />

            <form onSubmit={register}>

                <div>
                    <h2>Create Seller Account</h2>

                    <label>Your name</label>
                    <div>
                        <input
                            ref={nameInput}
                            placeholder='First and last name'
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                            value={user.name}
                            onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
                        />
                    </div>

                    <div
                        className={styles.registerErrorMessage}
                        ref={nameError}
                    >
                        <div>!</div>
                        <div>Enter your name</div>
                    </div>

                    <label>Mobile number or email</label>


                    <div>
                        <div
                            className={styles.registerMobileNumberOrEmail}
                        >

                            {
                                isNumber &&

                                <button
                                    type='button'
                                    onClick={showCountryList}   
                                >{selectedCountryForMobileNumber}</button>
                            }

                            <input
                                ref={mobileNumberOrEmailInput}
                                onFocus={addParentPetrolBorder}
                                onBlur={removeParentPetrolBorder}
                                value={user.mobileNumberOrEmail}
                                onChange={(e) => setUser(prev => ({ ...prev, mobileNumberOrEmail: e.target.value }))}
                            />
                        </div>
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

                    <label>Re-enter password</label>
                    <div>
                        <input
                            ref={reEnterPasswordInput}
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                        />
                    </div>

                    <div
                        className={styles.registerErrorMessage}
                        ref={reEnterPasswordError}
                    >
                        <div>!</div>
                        <div>Passwords must match</div>
                    </div>

                    <div className={styles.mobilePhoneInfoMessage}>
                        <div>By enrolling a mobile phone number, you</div>
                        <div>consent to receive automated security</div>
                        <div>notifications via text message from Amazon.</div>
                        <div>Your mobile phone number will not be shared</div>
                        <div>with third parties or affiliates for marketing or</div>
                        <div>promotional purposes without your permission.</div>
                        <div>Remove your number in Login & Security to</div>
                        <div>cancel. For more information, visit</div>
                        <div>amzn.com/help or call +1 888 280 4331.</div>
                        <div>Message and data rates may apply. Message</div>
                        <div>frequency varies.</div>
                    </div>

                    <button type='submit'>Continue</button>
                </div>

                <section>
                    <p>By creating an account, you agree to Amazon's</p>
                    <p><Link href='#'>Condition of use</Link> and <Link href='#'>Privacy Notice</Link>.</p>
                </section>

                <section>
                    <strong>Do you want to create a buyer account?</strong>
                    <Link href='/pages/users/register'>Create a free buyer account</Link>
                </section>

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

            <div
                className={styles.countryDialingCodes}
                style={{ width: '220px' }}
                ref={countryList}
                >
                {
                    countryDialingCodes.map((country, index) => (
                        <section
                            key={index}
                            onClick={() => changeDialingCode(`${country.code} ${country.dialCode}`)}
                        >
                            <p>{country.country}</p>
                            <p>{country.dialCode}</p>
                        </section>
                    ))
                }
            </div>

        </div>
    );
};

export default Register;

// comment to push cause setting env variables into vercel