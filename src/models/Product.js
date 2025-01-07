import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller_name: { type: String, required: true },
  product_name: { type: String, required: true },
  main_image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
  additional_images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  description: { type: String, required: true },
  price: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics & Computers',
      'Clothing, Shoes & Jewelry',
      'Home & Kitchen',
      'Beauty & Personal Care',
      'Books & Audible',
      'Sports & Outdoors',
      'Toys & Games',
      'Groceries & Gourmet Food',
      'Automotive',
      'Garden & Outdoor',
      'Health & Household',
      'Pet Supplies',
      'Office Products',
    ],
  },
  subcategory: {
    type: String,
    required: true,
    enum: [
      // Electronics & Computers
      'Laptops', 'Desktops', 'Tablets', 'Cameras', 'Drones', 'Smart Home Devices',
      'TV, Audio & Home Theater', 'Computer Components',

      // Clothing, Shoes & Jewelry
      'Men’s Clothing', 'Women’s Clothing', 'Kids’ Clothing', 'Shoes', 'Watches',
      'Accessories',

      // Home & Kitchen
      'Furniture', 'Kitchen & Dining', 'Bedding', 'Home Décor', 'Tools & Home Improvement',

      // Beauty & Personal Care
      'Skincare', 'Haircare', 'Makeup', 'Fragrances', 'Personal Hygiene',

      // Books & Audible
      'Fiction', 'Non-Fiction', 'Children’s Books', 'Educational Material', 'Audiobooks',

      // Sports & Outdoors
      'Exercise Equipment', 'Outdoor Gear', 'Team Sports Equipment', 'Cycling', 'Fishing',
      'Hunting',

      // Toys & Games
      'Action Figures', 'Educational Toys', 'Board Games', 'Dolls & Plush Toys',

      // Groceries & Gourmet Food
      'Snacks', 'Beverages', 'Specialty Foods', 'Organic Products',

      // Automotive
      'Car Accessories', 'Motorcycle Parts', 'Tools & Equipment',

      // Garden & Outdoor
      'Gardening Tools', 'Outdoor Furniture', 'Grills', 'Lawn Care',

      // Health & Household
      'Medical Supplies', 'Household Essentials', 'Vitamins & Supplements',

      // Pet Supplies
      'Pet Food', 'Pet Toys', 'Pet Health Products',

      // Office Products
      'Office Supplies', 'Business Equipment', 'School Supplies',
    ],
  },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', productSchema);
