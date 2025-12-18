// STEPS TO RUN THE PROJECT 
// 1. download the project and extract the files 
// open the project and RUN npm install in terminal for packages and dependencies 
// and start the frontend by npm run dev
// 2. type cd backend in terminal to go to backend directory 
    // here also run npm install 

    // 3. important step 

    // add the watch data given below in the database through compass 
  
    // the data contains the watch image url do not change anything

    // working web app


// optional if u want to add the below data or not
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

   
// add the data below in your database through campas

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
