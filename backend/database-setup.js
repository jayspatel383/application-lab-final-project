// database-setup.js
// Run this with: node database-setup.js

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load environment variables - MATCHES YOUR .ENV FILE
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/amazon_clone';
const DB_NAME = 'amazon_clone'; // Hardcoded to match your .env

console.log('🔗 Connecting to database:', DB_NAME);

// Sample users data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    address: '123 Main St, New York, NY',
    isAdmin: false
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+1987654321',
    address: '456 Oak Ave, Los Angeles, CA',
    isAdmin: false
  },
  {
    name: 'Professor Admin',
    email: 'professor@university.edu',
    password: 'professor123',
    phone: '+1122334455',
    address: 'University Campus, Computer Science Dept',
    isAdmin: true
  }
];

// YOUR ACTUAL WATCH DATA (from your MongoDB export)
const sampleWatches = [
  {
    name: "Breitling Navitimer",
    price: 899.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Breitling%20Navitimer/BN4.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Breitling%20Navitimer/BN3.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Breitling%20Navitimer/BN2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Breitling%20Navitimer/BN1.jpeg"
    ],
    description: "Iconic pilot watch with a timeless aviation-inspired design.",
    categories: ["mens-watches", "luxury", "chronograph"],
    rating: 4.7,
    reviews: [
      {
        username: "John D",
        rating: 5,
        comment: "Excellent build quality and premium feel."
      },
      {
        username: "Alex R",
        rating: 4,
        comment: "Very stylish and comfortable."
      }
    ],
    specs: [
      "Case Diameter: 42mm",
      "Movement: Automatic",
      "Water Resistance: 200 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 10,
    inStock: true,
    brand: "Breitling",
    category: "luxury"
  },
  {
    name: "Cartier Santos",
    price: 749.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Cartier%20Santos/CS2.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Cartier%20Santos/CS1.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Cartier%20Santos/CS3.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Cartier%20Santos/CS2.jpeg"
    ],
    description: "Elegant luxury watch combining classic design with modern engineering.",
    categories: ["mens-watches", "luxury", "dress-watch"],
    rating: 4.6,
    reviews: [
      {
        username: "Emily W",
        rating: 5,
        comment: "Absolutely elegant and classy."
      },
      {
        username: "Mark T",
        rating: 4,
        comment: "Perfect everyday luxury watch."
      }
    ],
    specs: [
      "Case Diameter: 39mm",
      "Movement: Automatic",
      "Water Resistance: 100 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 8,
    inStock: true,
    brand: "Cartier",
    category: "luxury"
  },
  {
    name: "Hamilton Khaki Field Mechanical H69439931",
    price: 449.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hamilton%20Khaki%20Field%20Mechanical%20H69439931/h2.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hamilton%20Khaki%20Field%20Mechanical%20H69439931/hamilton.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hamilton%20Khaki%20Field%20Mechanical%20H69439931/h2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hamilton%20Khaki%20Field%20Mechanical%20H69439931/h3.jpeg"
    ],
    description: "Rugged military-inspired field watch with hand-wound movement.",
    categories: ["mens-watches", "mid-luxury", "field-watch"],
    rating: 4.5,
    reviews: [
      {
        username: "Chris B",
        rating: 5,
        comment: "Very rugged and reliable."
      },
      {
        username: "Daniel K",
        rating: 4,
        comment: "Great value for money."
      }
    ],
    specs: [
      "Case Diameter: 38mm",
      "Movement: Mechanical",
      "Water Resistance: 50 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 15,
    inStock: true,
    brand: "Hamilton",
    category: "mid-luxury"
  },
  {
    name: "Hublot Big Bang",
    price: 1199.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hublot%20Big%20Bang/H4.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hublot%20Big%20Bang/H3.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hublot%20Big%20Bang/H2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Hublot%20Big%20Bang/H1.jpeg"
    ],
    description: "Bold luxury watch with a modern and sporty design.",
    categories: ["mens-watches", "luxury", "sports"],
    rating: 4.8,
    reviews: [
      {
        username: "Victor L",
        rating: 5,
        comment: "Stunning design and premium feel."
      },
      {
        username: "Ryan M",
        rating: 5,
        comment: "Looks amazing on the wrist."
      }
    ],
    specs: [
      "Case Diameter: 44mm",
      "Movement: Automatic Chronograph",
      "Water Resistance: 100 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 5,
    inStock: true,
    brand: "Hublot",
    category: "luxury"
  },
  {
    name: "IWC Portugieser Chronograph",
    price: 999.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/IWC%20Portugieser%20Chronograph/IWC3.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/IWC%20Portugieser%20Chronograph/IWC2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/IWC%20Portugieser%20Chronograph/IWC4.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/IWC%20Portugieser%20Chronograph/IWC1.jpeg"
    ],
    description: "Sophisticated chronograph with a clean and elegant dial.",
    categories: ["mens-watches", "luxury", "chronograph"],
    rating: 4.7,
    reviews: [
      {
        username: "Oliver S",
        rating: 5,
        comment: "Classic and timeless design."
      },
      {
        username: "Nathan H",
        rating: 4,
        comment: "Very refined watch."
      }
    ],
    specs: [
      "Case Diameter: 41mm",
      "Movement: Automatic Chronograph",
      "Water Resistance: 30 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 7,
    inStock: true,
    brand: "IWC",
    category: "luxury"
  },
  {
    name: "Jaeger-LeCoultre Reverso",
    price: 1099.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Jaeger-LeCoultre%20Reverso/J3.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Jaeger-LeCoultre%20Reverso/J2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Jaeger-LeCoultre%20Reverso/J1.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Jaeger-LeCoultre%20Reverso/J4.jpeg"
    ],
    description: "Iconic reversible watch with Art Deco elegance.",
    categories: ["mens-watches", "luxury", "dress-watch"],
    rating: 4.9,
    reviews: [
      {
        username: "Sophia L",
        rating: 5,
        comment: "Pure class and craftsmanship."
      },
      {
        username: "Ethan P",
        rating: 5,
        comment: "A masterpiece on the wrist."
      }
    ],
    specs: [
      "Case Size: 45.6 x 27.4mm",
      "Movement: Manual",
      "Water Resistance: 30 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 4,
    inStock: true,
    brand: "Jaeger-LeCoultre",
    category: "luxury"
  },
  {
    name: "Omega Seamaster",
    price: 799.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Omega%20Seamaster/pexels-quang-viet-nguyen-107013384-13257111.jpg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Omega%20Seamaster/pexels-quang-viet-nguyen-107013384-13257109.jpg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Omega%20Seamaster/pexels-quang-viet-nguyen-107013384-9561298.jpg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Omega%20Seamaster/pexels-adil-khan-marwat-407278438-15101371.jpg"
    ],
    description: "Legendary dive watch known for durability and precision.",
    categories: ["mens-watches", "luxury", "diver"],
    rating: 4.8,
    reviews: [
      {
        username: "James B",
        rating: 5,
        comment: "Perfect dive watch."
      },
      {
        username: "Luke R",
        rating: 4,
        comment: "Solid and reliable."
      }
    ],
    specs: [
      "Case Diameter: 42mm",
      "Movement: Automatic",
      "Water Resistance: 300 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 12,
    inStock: true,
    brand: "Omega",
    category: "luxury"
  },
  {
    name: "Panerai Luminor",
    price: 949.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Panerai%20Luminor/PL4.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Panerai%20Luminor/PL3.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Panerai%20Luminor/PL2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Panerai%20Luminor/PL4.jpeg"
    ],
    description: "Bold Italian design with iconic crown protection.",
    categories: ["mens-watches", "luxury", "sports"],
    rating: 4.6,
    reviews: [
      {
        username: "Marco V",
        rating: 5,
        comment: "Unique design and great presence."
      },
      {
        username: "Adam C",
        rating: 4,
        comment: "Very comfortable despite the size."
      }
    ],
    specs: [
      "Case Diameter: 44mm",
      "Movement: Automatic",
      "Water Resistance: 300 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 6,
    inStock: true,
    brand: "Panerai",
    category: "luxury"
  },
  {
    name: "Patek Philippe Nautilus",
    price: 1499.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Patek%20Philippe%20Nautilus/Original%20Patek%20Philippe%20Nautilus%20reference%203700_1,%201976.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Patek%20Philippe%20Nautilus/Patek%20Philippe%20Nautilus%205711_1R-001%20-%20Rose%20Gold%20Chocolate%20Dial%20-%20Hands-On%20with%20Live%20Photos%20-%20Monochrome-Watches.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Patek%20Philippe%20Nautilus/Original%20Patek%20Philippe%20Nautilus%20reference%203700_1,%201976.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Patek%20Philippe%20Nautilus/Domain%20parking%20page.jpeg"
    ],
    description: "One of the most prestigious luxury sports watches in the world.",
    categories: ["mens-watches", "luxury", "sports"],
    rating: 5,
    reviews: [
      {
        username: "William K",
        rating: 5,
        comment: "The ultimate luxury watch."
      },
      {
        username: "Henry Z",
        rating: 5,
        comment: "Unmatched craftsmanship."
      }
    ],
    specs: [
      "Case Diameter: 40mm",
      "Movement: Automatic",
      "Water Resistance: 120 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 2,
    inStock: true,
    brand: "Patek Philippe",
    category: "luxury"
  },
  {
    name: "ROLEX Submariner",
    price: 1299.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/ROLEX%20SUBMARINER/pexels-mitchel-durfee-2310075-6230455.jpg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/ROLEX%20SUBMARINER/pexels-pixabay-364822.jpg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/ROLEX%20SUBMARINER/pexels-quang-viet-nguyen-107013384-9561302.jpg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/ROLEX%20SUBMARINER/pexels-rubaitulazad-10414755.jpg"
    ],
    description: "Iconic dive watch with legendary reliability and status.",
    categories: ["mens-watches", "luxury", "diver"],
    rating: 4.9,
    reviews: [
      {
        username: "Daniel S",
        rating: 5,
        comment: "Timeless and iconic."
      },
      {
        username: "Robert F",
        rating: 5,
        comment: "Worth every penny."
      }
    ],
    specs: [
      "Case Diameter: 41mm",
      "Movement: Automatic",
      "Water Resistance: 300 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 3,
    inStock: true,
    brand: "ROLEX",
    category: "luxury"
  },
  {
    name: "Tag Heuer Carrera",
    price: 699.99,
    image: "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Tag%20Heuer%20Carrera/TH1.jpeg",
    images: [
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Tag%20Heuer%20Carrera/TH3.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Tag%20Heuer%20Carrera/TH2.jpeg",
      "https://ehcybxbylvbchscqfmos.supabase.co/storage/v1/object/public/WATCHES/Tag%20Heuer%20Carrera/TH1.jpeg"
    ],
    description: "Sporty chronograph inspired by motor racing heritage.",
    categories: ["mens-watches", "luxury", "chronograph"],
    rating: 4.5,
    reviews: [
      {
        username: "Kevin M",
        rating: 4,
        comment: "Great sporty look."
      },
      {
        username: "Aaron J",
        rating: 5,
        comment: "Excellent chronograph."
      }
    ],
    specs: [
      "Case Diameter: 42mm",
      "Movement: Automatic Chronograph",
      "Water Resistance: 100 meters",
      "Glass: Sapphire Crystal"
    ],
    quantityAvailable: 14,
    inStock: true,
    brand: "Tag Heuer",
    category: "luxury"
  }
];

// Connect to MongoDB - UPDATED TO MATCH YOUR .ENV
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      // REMOVED dbName since it's already in the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB database:', DB_NAME);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('Please check your MONGO_URI in .env file');
    console.log('Current URI:', MONGO_URI);
    return false;
  }
}

// Define schemas matching your data structure
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  address: String,
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  images: [String],
  description: { type: String, required: true },
  categories: [String],
  rating: { type: Number, min: 0, max: 5 },
  reviews: [{
    username: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  specs: [String],
  quantityAvailable: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  brand: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);

// Hash password function
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Extract brand from product name for consistent data
function extractBrand(productName) {
  const brands = [
    'Breitling', 'Cartier', 'Hamilton', 'Hublot', 'IWC', 
    'Jaeger-LeCoultre', 'Omega', 'Panerai', 'Patek Philippe', 
    'ROLEX', 'Tag Heuer'
  ];
  
  for (const brand of brands) {
    if (productName.includes(brand)) {
      return brand;
    }
  }
  
  // Extract first word as brand
  return productName.split(' ')[0];
}

// Extract main category
function extractMainCategory(categories) {
  if (categories.includes('luxury')) return 'luxury';
  if (categories.includes('mid-luxury')) return 'mid-luxury';
  return categories[0] || 'watches';
}

// Process products to ensure consistent structure
function processProducts(products) {
  return products.map(product => {
    return {
      ...product,
      brand: extractBrand(product.name),
      category: extractMainCategory(product.categories),
      // Ensure all required fields exist
      categories: product.categories || [],
      images: product.images || [],
      reviews: product.reviews || [],
      specs: product.specs || []
    };
  });
}

// Populate database
async function populateDatabase() {
  try {
    console.log('\n🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create users with hashed passwords
    console.log('\n👤 Creating users...');
    const createdUsers = [];
    for (const user of sampleUsers) {
      const hashedPassword = await hashPassword(user.password);
      const newUser = new User({
        ...user,
        password: hashedPassword
      });
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
    }
    console.log(`✅ Created ${createdUsers.length} users`);

    // Process and create products
    console.log('\n🛍️ Creating products...');
    const processedProducts = processProducts(sampleWatches);
    const createdProducts = [];
    
    for (const product of processedProducts) {
      const newProduct = new Product(product);
      const savedProduct = await newProduct.save();
      createdProducts.push(savedProduct);
    }
    
    console.log(`✅ Created ${createdProducts.length} luxury watches`);

    // Display summary
    console.log('\n🎉 Database populated successfully!');
    console.log('====================================');
    console.log('\n📋 Sample User Credentials:');
    console.log('-------------------------');
    sampleUsers.forEach((user, index) => {
      console.log(`${index + 1}. Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Password: ${user.password}`);
      console.log(`   Admin: ${user.isAdmin ? 'Yes' : 'No'}`);
      console.log('');
    });

    console.log('\n📊 Product Database Summary:');
    console.log('---------------------------');
    console.log(`Total Products: ${createdProducts.length}`);
    console.log(`Total Brands: ${[...new Set(createdProducts.map(p => p.brand))].length}`);
    console.log(`Total Categories: ${[...new Set(createdProducts.flatMap(p => p.categories))].length}`);
    
    console.log('\n🏷️ Available Brands:');
    const brands = [...new Set(createdProducts.map(p => p.brand))];
    console.log(brands.join(', '));
    
    console.log('\n🏷️ Price Range:');
    const prices = createdProducts.map(p => p.price);
    console.log(`Min: $${Math.min(...prices).toFixed(2)}`);
    console.log(`Max: $${Math.max(...prices).toFixed(2)}`);
    console.log(`Avg: $${(prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2)}`);
    
    console.log('\n🔗 Connection Details:');
    console.log('-------------------');
    console.log(`Database: ${DB_NAME}`);
    console.log(`URI: ${MONGO_URI.replace(/:[^:]*@/, ':****@')}`); // Hide password
    
    return true;
    
  } catch (error) {
    console.error('❌ Error populating database:', error.message);
    if (error.code === 11000) {
      console.log('Duplicate key error - email already exists');
    }
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Luxury Watch Database Setup...');
  console.log('==========================================\n');
  
  // Check for required packages
  try {
    require('dotenv');
    require('mongoose');
    require('bcryptjs');
  } catch (err) {
    console.log('❌ Required packages not installed.');
    console.log('Please run: npm install dotenv mongoose bcryptjs');
    process.exit(1);
  }
  
  // Connect to database
  const connected = await connectDB();
  if (!connected) {
    process.exit(1);
  }
  
  // Populate data
  const populated = await populateDatabase();
  
  // Close connection
  await mongoose.connection.close();
  console.log('\n🔗 MongoDB connection closed');
  console.log(populated ? '✅ Setup completed successfully!' : '❌ Setup failed');
  
  process.exit(populated ? 0 : 1);
}

// Run the setup
if (require.main === module) {
  main().catch(err => {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  });
}

module.exports = { connectDB, populateDatabase };