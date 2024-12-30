'use client';

import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const Register = () => {

    const register = (e) => {
        e.preventDefault();
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
                style={{ width: "auto" }}
                alt='Amazon Logo with background white'
            />

            <form onSubmit={register}>

                <div>
                    <h2>Create Account</h2>

                    <label>Your name</label>
                    <div>
                        <input placeholder='First and last name'
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                        />
                    </div>

                    <label>Mobile number or email</label>
                    <div>
                        <input
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                        />
                    </div>

                    <label>Password</label>
                    <div>
                        <input
                            placeholder='At least 6 characters'
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                        />
                    </div>

                    <p><span>i</span> Passwords must be at least 6 characters.</p>

                    <label>Re-enter password</label>
                    <div>
                        <input
                            onFocus={addParentPetrolBorder}
                            onBlur={removeParentPetrolBorder}
                        />
                    </div>

                    <button type='submit'>Continue</button>
                </div>

                <section>
                    <p>By creating an account, you agree to Amazon's</p>
                    <p><Link href='#'>Condition of use</Link> and <Link href='#'>Privacy Notice</Link>.</p>
                </section>

                <section>
                    <strong>Buying for work?</strong>
                    <Link href='#'>Create a free business account</Link>
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
        </div>
    );
};

export default Register;