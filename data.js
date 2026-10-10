// Shared listings data used by every page (home, marketplace, details, checkout, dashboard).
// Load this script before any page script.

// Seed listings: localized Northern Province assets with detailed street addresses
const BASE_LISTINGS = [
  {
    id: 1,
    title: "Commercial Cloud Kitchen Space",
    category: "kitchens",
    location: "No. 12, Hospital Road, Jaffna",
    price: 3500,
    priceHourly: 500,
    unit: "day",
    rating: 4.9,
    reviews: 24,
    specs: {
      size: "450 sqft",
      capacity: "8 chefs",
      power: "3-Phase Power"
    },
    image: "assets/Commercial Cloud Kitchen Space.jpeg",
    description: "Fully certified, premium commercial kitchen space near Jaffna Teaching Hospital. Features stainless steel prep counters, commercial LP burners, refrigeration units, and wet grinding areas. Ideal for catering startups, home bakers, or delivery brands.",
    labels: [
      "Available Today",
      "Verified Owner",
      "Most Booked"
    ],
    images: [
      "assets/Commercial Cloud Kitchen Space.jpeg",
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Shalini Alwis",
      joined: "Joined Oct 2025",
      responseRate: "100%",
      responseTime: "under 15 mins",
      avatar: "S",
      phone: "+94 77 987 6543",
      email: "shalini.a@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Thilak S.",
        rating: 5,
        date: "May 2026",
        comment: "Excellent facility. Extremely clean, and all equipment was fully functional. Ideal for our seasonal catering orders."
      },
      {
        author: "Nirmala R.",
        rating: 4.8,
        date: "April 2026",
        comment: "Very convenient location near the teaching hospital. Clean counters and reliable gas supply. Will rent again."
      }
    ]
  },
  {
    id: 2,
    title: "Suzuki Every Mini Van (Dual A/C)",
    category: "vehicles",
    location: "No. 15, Kokuvil East, Jaffna",
    price: 6500,
    priceHourly: 800,
    unit: "day",
    rating: 4.8,
    reviews: 18,
    specs: {
      size: "500kg Payload",
      capacity: "5 passengers",
      fuel: "Petrol"
    },
    image: "assets/Suzuki Every Mini Van (Dual AC).jpg",
    description: "Fuel-efficient, spacious Suzuki Every minivan available for small business deliveries, passenger transport, or family trips starting from Kokuvil. Flexible lease terms, fully insured, self-drive options.",
    labels: [
      "Verified Owner",
      "Community Trusted"
    ],
    images: [
      "assets/Suzuki Every Mini Van (Dual AC).jpg",
      "https://images.unsplash.com/photo-1517524006129-4a3a99d428e6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Ravi Kumara",
      joined: "Joined Jan 2026",
      responseRate: "98%",
      responseTime: "under 30 mins",
      avatar: "R",
      phone: "+94 76 111 2233",
      email: "ravi.k@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Mahen T.",
        rating: 5,
        date: "June 2026",
        comment: "Great van, very fuel-efficient. Ravi was very easy to coordinate with. Highly recommend!"
      }
    ]
  },
  {
    id: 3,
    title: "Three-Wheel Tuk-Tuk (Bajaj RE)",
    category: "vehicles",
    location: "No. 18, KKS Road, Chunnakam",
    price: 2000,
    priceHourly: 300,
    unit: "day",
    rating: 4.75,
    reviews: 15,
    specs: {
      engine: "200cc Petrol",
      capacity: "3 passengers",
      transmission: "Manual"
    },
    image: "assets/Three-Wheel Tuk-Tuk (Bajaj RE).jpg",
    description: "Reliable Bajaj three-wheeler in pristine condition, ideal for local retail deliveries, tourist transport, or running errands in Chunnakam market area. Economical rates, includes tool kit and spare tyre.",
    labels: [
      "Available Today",
      "Verified Owner"
    ],
    images: [
      "assets/Three-Wheel Tuk-Tuk (Bajaj RE).jpg",
      "https://images.unsplash.com/photo-1566371486490-560ded239fe6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Arul Sundaram",
      joined: "Joined Dec 2025",
      responseRate: "100%",
      responseTime: "under 10 mins",
      avatar: "A",
      phone: "+94 77 222 3344",
      email: "arul.s@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Karthik J.",
        rating: 5,
        date: "May 2026",
        comment: "Perfect runner. Picked it up in Chunnakam town, drove it to Point Pedro and back with zero issues."
      }
    ]
  },
  {
    id: 4,
    title: "35 kVA Soundproof Diesel Generator",
    category: "equipment",
    location: "No. 27, Station Road, Kilinochchi",
    price: 3000,
    priceHourly: 400,
    unit: "day",
    rating: 4.9,
    reviews: 20,
    specs: {
      output: "35 kVA",
      fuel: "Diesel",
      type: "Soundproof"
    },
    image: "assets/35 kVA Soundproof Diesel Generator.jpeg",
    description: "High-capacity soundproof diesel generator, perfect for event backup power, agricultural milling sites, or small garment factories experiencing grid power cuts. Low fuel consumption, automatic voltage regulation.",
    labels: [
      "Most Booked",
      "Verified Owner"
    ],
    images: [
      "assets/35 kVA Soundproof Diesel Generator.jpeg",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Suresh Perera",
      joined: "Joined Aug 2025",
      responseRate: "95%",
      responseTime: "under 1 hour",
      avatar: "S",
      phone: "+94 71 333 4455",
      email: "suresh.p@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Anton D.",
        rating: 5,
        date: "June 2026",
        comment: "Suresh delivered the generator right to our festival site. Quiet, powerful, and ran all night without issue."
      }
    ]
  },
  {
    id: 5,
    title: "Professional Outdoor Sound & PA System",
    category: "equipment",
    location: "No. 45, Temple Road, Nallur",
    price: 4500,
    priceHourly: 600,
    unit: "day",
    rating: 4.95,
    reviews: 14,
    specs: {
      speakers: "4x JBL 15\"",
      mixer: "12-Channel",
      mic: "2x Wireless"
    },
    image: "assets/Professional Outdoor Sound & PA System.webp",
    description: "Premium outdoor PA and sound system for events, temple festivals, weddings, or corporate setups in Nallur. Delivered, set up, and operated by a qualified sound technician. Crystal clear audio output.",
    labels: [
      "Community Trusted",
      "Verified Owner"
    ],
    images: [
      "assets/Professional Outdoor Sound & PA System.webp",
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Selvaraj M.",
      joined: "Joined Nov 2025",
      responseRate: "100%",
      responseTime: "under 20 mins",
      avatar: "S",
      phone: "+94 77 444 5566",
      email: "selva.m@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Pradeep T.",
        rating: 5,
        date: "May 2026",
        comment: "Outstanding sound quality. Selvaraj stayed on site to manage the audio levels throughout our event."
      }
    ]
  },
  {
    id: 6,
    title: "Secure Dry Storage Room (15x20 ft)",
    category: "storage",
    location: "No. 8, Mannar Road, Vavuniya",
    price: 2500,
    priceHourly: 50,
    unit: "month",
    rating: 4.8,
    reviews: 11,
    specs: {
      size: "300 sqft",
      access: "24/7 Access",
      security: "Padlocked Gate"
    },
    image: "assets/Secure Dry Storage Room (15x20 ft).jpeg",
    description: "Clean, pest-controlled, and ventilated dry storage room located off Mannar Road. Ideal for storing agricultural produce (paddy, onions), retail merchandise, or commercial equipment safely. Independent entrance.",
    labels: [
      "Community Trusted",
      "Verified Owner"
    ],
    images: [
      "assets/Secure Dry Storage Room (15x20 ft).jpeg",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1565615833231-e8c91a38a012?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Mohammed N.",
      joined: "Joined Jul 2025",
      responseRate: "90%",
      responseTime: "under 2 hours",
      avatar: "M",
      phone: "+94 75 555 6677",
      email: "mohd.n@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Jaseem A.",
        rating: 4.7,
        date: "March 2026",
        comment: "Spacious and dry. Stored onions here for 3 weeks, no pest issues. Owner was cooperative."
      }
    ]
  },
  {
    id: 7,
    title: "Gated Commercial Parking Space",
    category: "parking",
    location: "No. 63, Point Pedro Road, Jaffna",
    price: 500,
    priceHourly: 50,
    unit: "day",
    rating: 4.7,
    reviews: 8,
    specs: {
      security: "CCTV/Guard",
      proximity: "Station (200m)",
      type: "Open Yard"
    },
    image: "assets/Gated Commercial Parking Space.jpg",
    description: "Secure, gated, open-yard parking bay suitable for delivery vans, lorries, or private cars near Jaffna Railway Station. 24/7 CCTV security coverage and gated padlock access.",
    labels: [
      "Available Today",
      "Verified Owner"
    ],
    images: [
      "assets/Gated Commercial Parking Space.jpg",
      "https://images.unsplash.com/photo-1506521788701-1e13a72df9da?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Thilak Subasinghe",
      joined: "Joined Sep 2025",
      responseRate: "100%",
      responseTime: "under 15 mins",
      avatar: "T",
      phone: "+94 77 666 7788",
      email: "thilak.s@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Priyasath K.",
        rating: 5,
        date: "May 2026",
        comment: "Left my van here for 4 days while traveling. Completely secure yard, CCTV and physical lock. Very pleased."
      }
    ]
  },
  {
    id: 8,
    title: "Commercial Deck Bakery Oven (Gas)",
    category: "kitchens",
    location: "No. 21, Main Street, Mullaitivu",
    price: 3500,
    priceHourly: 500,
    unit: "day",
    rating: 4.85,
    reviews: 12,
    specs: {
      type: "Double Deck",
      capacity: "4 Trays",
      fuel: "LPG Gas"
    },
    image: "assets/Commercial Deck Bakery Oven (Gas).jpg",
    description: "Double-deck industrial gas baking oven, perfect for local bakeries, pastry shops, or seasonal bin/bread makers. Reaches high baking temperatures rapidly with even heat distribution. Cleaned and maintained.",
    labels: [
      "Most Booked",
      "Verified Owner"
    ],
    images: [
      "assets/Commercial Deck Bakery Oven (Gas).jpg",
      "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Anton Pillai",
      joined: "Joined Feb 2026",
      responseRate: "97%",
      responseTime: "under 30 mins",
      avatar: "A",
      phone: "+94 72 777 8899",
      email: "anton.p@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Sinthu J.",
        rating: 5,
        date: "April 2026",
        comment: "Bakes perfectly even buns and cakes. Easy to connect gas line. Saved my bakery during a major power outage."
      }
    ]
  },
  {
    id: 9,
    title: "Motorbike Delivery Bike",
    category: "vehicles",
    location: "No. 45, Temple Road, Nallur",
    price: 1500,
    priceHourly: 200,
    unit: "day",
    rating: 4.6,
    reviews: 5,
    specs: {
      type: "100cc Eco",
      luggage: "Rear Carrier box",
      transmission: "Manual"
    },
    image: "assets/Motorbike Delivery Bike.jpeg",
    description: "Super-economical delivery motorbike with a heavy-duty insulated carrier box. Ideal for food deliveries, document dispatch, or e-commerce delivery riders starting from Jaffna Nallur.",
    labels: [
      "Available Today",
      "Verified Owner"
    ],
    images: [
      "assets/Motorbike Delivery Bike.jpeg",
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1558981852-414757c91357?auto=format&fit=crop&w=600&q=80"
    ],
    host: {
      name: "Arul Sundaram",
      joined: "Joined Dec 2025",
      responseRate: "100%",
      responseTime: "under 10 mins",
      avatar: "A",
      phone: "+94 77 222 3344",
      email: "arul.s@utillanka.lk"
    },
    reviewsList: [
      {
        author: "Vajira N.",
        rating: 4.8,
        date: "May 2026",
        comment: "Insulated box works great for hot food dispatch. Extremely high fuel economy."
      }
    ]
  }
];

const listingsDatabase = BASE_LISTINGS.slice();
