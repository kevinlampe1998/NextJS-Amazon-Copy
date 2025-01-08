const exampleSeller = [
    {
        name: 'Electronics & Computers Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Electronics & Computers@mail.com',
    },
    {
        name: 'Clothing, Shoes & Jewelry Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Clothing, Shoes & Jewelry@mail.com',
    },
    {
        name: 'Home & Kitchen Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Home & Kitchen@mail.com',
    },
    {
        name: 'Beauty & Personal Care Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Beauty & Personal Care@mail.com',
    },
    {
        name: 'Books & Audible Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Books & Audible@mail.com',
    },
    {
        name: 'Sports & Outdoors Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Sports & Outdoors@mail.com',
    },
    {
        name: 'Toys & Games Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Toys & Games@mail.com',
    },
    {
        name: 'Groceries & Gourmet Food Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Groceries & Gourmet Food@mail.com',
    },
    {
        name: 'Automotive Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Automotive@mail.com',
    },
    {
        name: 'Garden & Outdoor Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Garden & Outdoor@mail.com',
    },
    {
        name: 'Health & Household Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Health & Household@mail.com',
    },
    {
        name: 'Pet Supplies Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Pet Supplies@mail.com',
    },
    {
        name: 'Office Products Shop',
        role: 'seller',
        password: '1234567',
        mobileNumberOrEmail: 'Office Products@mail.com',
    },
];

const postSingleSeller = async (payload) => {
    const res = await fetch('https://next-js-amazon-copy.vercel.app/api/sellers/register', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(data);
    return data.success ? true : false;
};

const registerAllSellers = async () => {
    try {
        const results = await Promise.all(
            exampleSeller.map((seller) => postSingleSeller(seller))
        );
        console.log('Here are the results!', results);
    } catch (error) {
        console.error('Error registration of all example seller:', error);
    }
};

registerAllSellers();