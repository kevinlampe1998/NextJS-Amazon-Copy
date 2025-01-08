const exampleSeller = [
    {
        name: 'Electronics & Computers Shop',
        role: 'seller',
        password: '1234567',
        email: 'Electronics & Computers@mail.com',
    },
    {
        name: 'Clothing, Shoes & Jewelry Shop',
        role: 'seller',
        password: '1234567',
        email: 'Clothing, Shoes & Jewelry@mail.com',
    },
    {
        name: 'Home & Kitchen Shop',
        role: 'seller',
        password: '1234567',
        email: 'Home & Kitchen@mail.com',
    },
    {
        name: 'Beauty & Personal Care Shop',
        role: 'seller',
        password: '1234567',
        email: 'Beauty & Personal Care@mail.com',
    },
    {
        name: 'Books & Audible Shop',
        role: 'seller',
        password: '1234567',
        email: 'Books & Audible@mail.com',
    },
    {
        name: 'Sports & Outdoors Shop',
        role: 'seller',
        password: '1234567',
        email: 'Sports & Outdoors@mail.com',
    },
    {
        name: 'Toys & Games Shop',
        role: 'seller',
        password: '1234567',
        email: 'Toys & Games@mail.com',
    },
    {
        name: 'Groceries & Gourmet Food Shop',
        role: 'seller',
        password: '1234567',
        email: 'Groceries & Gourmet Food@mail.com',
    },
    {
        name: 'Automotive Shop',
        role: 'seller',
        password: '1234567',
        email: 'Automotive@mail.com',
    },
    {
        name: 'Garden & Outdoor Shop',
        role: 'seller',
        password: '1234567',
        email: 'Garden & Outdoor@mail.com',
    },
    {
        name: 'Health & Household Shop',
        role: 'seller',
        password: '1234567',
        email: 'Health & Household@mail.com',
    },
    {
        name: 'Pet Supplies Shop',
        role: 'seller',
        password: '1234567',
        email: 'Pet Supplies@mail.com',
    },
    {
        name: 'Office Products Shop',
        role: 'seller',
        password: '1234567',
        email: 'Office Products@mail.com',
    },
];

const postSingleSeller = async (payload) => {
    const res = await fetch('/api/sellers/register', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload)
    });
    const data = await res.json();
    console.log(data);
};

const registerAllSellers = async () => {
    try {
        const results = await Promise.all(
            exampleSeller.map((seller) => postSingleSeller(seller))
        );
        console.log('All sellers are successfully with the registration!', results);
    } catch (error) {
        console.error('Error registration of all example seller:', error);
    }
};

registerAllSellers();