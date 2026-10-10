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

// Listings published by the user are kept in localStorage so they survive reloads
// and are visible on every page.
const USER_LISTINGS_KEY = "userListings";

const CATEGORY_PLACEHOLDER_IMAGES = {
  kitchens: "assets/Commercial Cloud Kitchen Space.jpeg",
  vehicles: "assets/Suzuki Every Mini Van (Dual AC).jpg",
  equipment: "assets/35 kVA Soundproof Diesel Generator.jpeg",
  storage: "assets/Secure Dry Storage Room (15x20 ft).jpeg",
  parking: "assets/Gated Commercial Parking Space.jpg"
};

function loadUserListings() {
  try {
    return JSON.parse(localStorage.getItem(USER_LISTINGS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveUserListings(listings) {
  try {
    localStorage.setItem(USER_LISTINGS_KEY, JSON.stringify(listings));
    return true;
  } catch (e) {
    return false;
  }
}

const listingsDatabase = [...loadUserListings(), ...BASE_LISTINGS];

function nextListingId() {
  return Math.max(0, ...listingsDatabase.map(item => item.id)) + 1;
}

// Builds a listing from the "List an Asset" form, saves it and adds it to listingsDatabase.
// `images` are data URLs of the photos the user uploaded (see upload.js).
function publishListing({ title, category, location, price, unit, description }, images = []) {
  const now = new Date();
  const listing = {
    id: nextListingId(),
    title: title,
    category: category,
    location: location,
    price: price,
    // Hourly rate assumes an 8-hour working day
    priceHourly: unit === "hour" ? price : Math.max(1, Math.round(price / (unit === "month" ? 240 : 8))),
    unit: unit,
    rating: 5.0,
    reviews: 0,
    specs: { size: "Standard size", availability: "Immediate" },
    image: images[0] || CATEGORY_PLACEHOLDER_IMAGES[category] || CATEGORY_PLACEHOLDER_IMAGES.kitchens,
    images: images,
    description: description,
    labels: ["Available Today", "New Listing"],
    // The demo is signed in as host Shalini Alwis (see the dashboard welcome message)
    host: { ...BASE_LISTINGS[0].host },
    reviewsList: [],
    createdAt: now.toISOString()
  };

  // Photos are the bulk of the size; if localStorage is full, keep fewer of them.
  const saved = loadUserListings();
  if (!saveUserListings([listing, ...saved]) &&
      !saveUserListings([{ ...listing, images: images.slice(0, 1) }, ...saved])) {
    saveUserListings([{ ...listing, images: [], image: CATEGORY_PLACEHOLDER_IMAGES[category] }, ...saved]);
  }

  listingsDatabase.unshift(listing);
  return listing;
}

// ---------------------------------------------------------------------------
// Host dashboard data. Any page can add a booking request; the dashboard shows it.
// ---------------------------------------------------------------------------

// Default mock data seeding for the demo (used until the dashboard state is first saved)
const DEFAULT_HOST_LISTINGS = [
  {
    id: 1,
    title: "Commercial Cloud Kitchen Space",
    category: "kitchens",
    location: "No. 12, Hospital Road, Jaffna",
    price: 3500,
    unit: "day",
    status: "Active",
    earnings: 14000,
    rating: 4.9,
    reviews: 24,
    image: "assets/Commercial Cloud Kitchen Space.jpeg"
  },
  {
    id: 2,
    title: "Suzuki Every Mini Van (Dual A/C)",
    category: "vehicles",
    location: "No. 15, Kokuvil East, Jaffna",
    price: 6500,
    unit: "day",
    status: "Active",
    earnings: 6500,
    rating: 4.8,
    reviews: 18,
    image: "assets/Suzuki Every Mini Van (Dual AC).jpg"
  },
  {
    id: 4,
    title: "35 kVA Soundproof Diesel Generator",
    category: "equipment",
    location: "No. 27, Station Road, Kilinochchi",
    price: 3000,
    unit: "day",
    status: "Active",
    earnings: 0,
    rating: 4.9,
    reviews: 20,
    image: "assets/35 kVA Soundproof Diesel Generator.jpeg"
  },
  {
    id: 6,
    title: "Secure Dry Storage Room (15x20 ft)",
    category: "storage",
    location: "No. 8, Mannar Road, Vavuniya",
    price: 2500,
    unit: "month",
    status: "Paused",
    earnings: 4000,
    rating: 4.8,
    reviews: 11,
    image: "assets/Secure Dry Storage Room (15x20 ft).jpeg"
  }
];

const DEFAULT_BOOKING_REQUESTS = [
  {
    id: 101,
    renter: "Selva R.",
    renterNic: "912345678V",
    assetId: 4,
    assetTitle: "35 kVA Soundproof Diesel Generator",
    dates: "June 16, 2026 at 09:00 AM",
    duration: 4,
    price: 1600,
    status: "Pending",
    rentMode: "hourly"
  },
  {
    id: 102,
    renter: "Thilak S.",
    renterNic: "751928374V",
    assetId: 1,
    assetTitle: "Commercial Cloud Kitchen Space",
    dates: "June 18, 2026 - June 20, 2026",
    duration: 2,
    price: 7000,
    status: "Pending",
    rentMode: "daily"
  },
  {
    id: 103,
    renter: "Kumar A.",
    renterNic: "198829304192",
    assetId: 6,
    assetTitle: "Secure Dry Storage Room (15x20 ft)",
    dates: "July 01, 2026 - August 01, 2026",
    duration: 1,
    price: 2500,
    status: "Pending",
    rentMode: "daily"
  }
];

const DEFAULT_COMPLETED_BOOKINGS = [
  { id: 201, assetTitle: "Commercial Cloud Kitchen Space", renter: "Nirmala R.", dates: "May 10, 2026 (4 hours)", amount: 2000, status: "Paid" },
  { id: 202, assetTitle: "Suzuki Every Mini Van (Dual A/C)", renter: "Mahen T.", dates: "May 22 - May 23, 2026", amount: 6500, status: "Paid" },
  { id: 203, assetTitle: "Secure Dry Storage Room (15x20 ft)", renter: "Jaseem A.", dates: "April 01 - May 01, 2026", amount: 2500, status: "Paid" },
  { id: 204, assetTitle: "Commercial Cloud Kitchen Space", renter: "Sinthu J.", dates: "April 15, 2026 (3 hours)", amount: 1500, status: "Paid" },
  { id: 205, assetTitle: "Suzuki Every Mini Van (Dual A/C)", renter: "Selva R.", dates: "April 18 - April 19, 2026", amount: 6500, status: "Paid" },
  { id: 206, assetTitle: "35 kVA Soundproof Diesel Generator", renter: "Anton D.", dates: "March 10 - March 12, 2026", amount: 6000, status: "Paid" },
  { id: 207, assetTitle: "Commercial Cloud Kitchen Space", renter: "Karthik J.", dates: "March 15, 2026 (6 hours)", amount: 3000, status: "Paid" },
  { id: 208, assetTitle: "Secure Dry Storage Room (15x20 ft)", renter: "Kumar A.", dates: "March 01 - April 01, 2026", amount: 2500, status: "Paid" },
  { id: 209, assetTitle: "Suzuki Every Mini Van (Dual A/C)", renter: "Pradeep T.", dates: "Feb 10 - Feb 11, 2026", amount: 6500, status: "Paid" },
  { id: 210, assetTitle: "Commercial Cloud Kitchen Space", renter: "Vajira N.", dates: "Feb 14 - Feb 15, 2026", amount: 3500, status: "Paid" },
  { id: 211, assetTitle: "35 kVA Soundproof Diesel Generator", renter: "Anton D.", dates: "Jan 12 - Jan 14, 2026", amount: 6000, status: "Paid" },
  { id: 212, assetTitle: "Commercial Cloud Kitchen Space", renter: "Thilak S.", dates: "Jan 20 - Jan 22, 2026", amount: 7000, status: "Paid" }
];

const DEFAULT_STATS = {
  totalListings: 4,
  activeBookings: 2,
  monthlyEarnings: 24500,
  pendingRequests: 3
};

const DEFAULT_NOTIFICATIONS = [
  { time: "Just now", text: "New booking request from Selva R. for Generator" },
  { time: "1 hour ago", text: "NIC Profile Verification approved by Util Lanka team" },
  { time: "Yesterday", text: "Payout of LKR 14,000 processed to Bank of Ceylon account" },
  { time: "2 days ago", text: "New 5-star review received from Mahen T. for Mini Van" }
];

function loadStored(key, fallback) {
  try {
    // Copy the fallback so callers can modify it without changing the defaults
    return JSON.parse(localStorage.getItem(key)) || structuredClone(fallback);
  } catch (e) {
    return structuredClone(fallback);
  }
}

// Saves a renter's request so it appears under Booking Requests on the host dashboard
function addBookingRequest({ renter, renterNic, renterPhone, asset, dates, duration, price, rentMode }) {
  const requests = loadStored("bookingRequests", DEFAULT_BOOKING_REQUESTS);
  const stats = loadStored("dashboardStats", DEFAULT_STATS);
  const notifications = loadStored("dashboardNotifications", DEFAULT_NOTIFICATIONS);

  const request = {
    id: Math.max(100, ...requests.map(r => r.id)) + 1,
    renter: renter,
    renterNic: renterNic || "",
    renterPhone: renterPhone || "",
    assetId: asset.id,
    assetTitle: asset.title,
    dates: dates,
    duration: duration,
    price: price,
    status: "Pending",
    rentMode: rentMode
  };

  requests.unshift(request);
  stats.pendingRequests += 1;
  notifications.unshift({ time: "Just now", text: `New booking request from ${renter} for ${asset.title}` });

  try {
    localStorage.setItem("bookingRequests", JSON.stringify(requests));
    localStorage.setItem("dashboardStats", JSON.stringify(stats));
    localStorage.setItem("dashboardNotifications", JSON.stringify(notifications));
  } catch (err) {
    console.error("Local storage error:", err);
  }
  return request;
}

// Saves the request from the quick "Book" modal on the home and marketplace pages
function addBookingRequestFromModal(listing, rentMode) {
  const formatDate = value => value
    ? new Date(value + "T00:00").toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })
    : "Date to be confirmed";
  const baseTotalText = document.getElementById("summary-base-total").textContent;

  let dates, duration;
  if (rentMode === "hourly") {
    dates = `${formatDate(document.getElementById("booking-rent-date").value)} at ${document.getElementById("booking-rent-time").value}`;
    duration = parseInt(document.getElementById("booking-rent-hours").value) || 1;
  } else {
    dates = `From ${formatDate(document.getElementById("booking-start-date").value)}`;
    duration = parseInt(document.getElementById("booking-duration").value) || 1;
  }

  return addBookingRequest({
    renter: document.getElementById("booking-user-name").value.trim(),
    renterPhone: document.getElementById("booking-user-contact").value.trim(),
    asset: listing,
    dates: dates,
    duration: duration,
    price: parseInt(baseTotalText.replace(/[^0-9]/g, "")) || 0,
    rentMode: rentMode
  });
}

// ---------------------------------------------------------------------------
// Districts and towns of the Northern Province (map coordinates are town centres)
// ---------------------------------------------------------------------------

const NORTHERN_TOWNS = [
  { town: "Jaffna", district: "Jaffna", lat: 9.6615, lng: 80.0255 },
  { town: "Nallur", district: "Jaffna", lat: 9.6747, lng: 80.0300 },
  { town: "Chunnakam", district: "Jaffna", lat: 9.7469, lng: 80.0262 },
  { town: "Chavakachcheri", district: "Jaffna", lat: 9.6580, lng: 80.1600 },
  { town: "Point Pedro", district: "Jaffna", lat: 9.8167, lng: 80.2333 },
  { town: "Kilinochchi", district: "Kilinochchi", lat: 9.3803, lng: 80.3770 },
  { town: "Mannar", district: "Mannar", lat: 8.9810, lng: 79.9044 },
  { town: "Mullaitivu", district: "Mullaitivu", lat: 9.2671, lng: 80.8142 },
  { town: "Vavuniya", district: "Vavuniya", lat: 8.7514, lng: 80.4971 }
];

const NORTHERN_DISTRICTS = [...new Set(NORTHERN_TOWNS.map(t => t.district))];

// The town is the last part of a listing's address ("No. 8, Mannar Road, Vavuniya" -> Vavuniya)
function getListingTown(listing) {
  const parts = listing.location.split(",");
  const townName = parts[parts.length - 1].trim();
  return NORTHERN_TOWNS.find(t => t.town === townName) || null;
}

// `area` is "" (anywhere), "district:<name>" or "town:<name>", as produced by populateAreaSelect()
function matchesArea(listing, area) {
  if (!area) return true;
  const town = getListingTown(listing);
  if (!town) return false;
  const [kind, name] = area.split(":");
  return kind === "district" ? town.district === name : town.town === name;
}

// Fills a <select> with towns grouped by district. Search selects also get a
// whole-district option per group and keep their existing "All Locations" option.
function populateAreaSelect(select, forSearch) {
  if (!select) return;
  const anyOption = forSearch ? select.querySelector('option[value=""]') : null;
  select.innerHTML = "";
  if (anyOption) select.appendChild(anyOption);

  NORTHERN_DISTRICTS.forEach(district => {
    const group = document.createElement("optgroup");
    group.label = `${district} District`;
    if (forSearch) {
      group.appendChild(new Option(`All of ${district} District`, `district:${district}`));
    }
    NORTHERN_TOWNS.filter(t => t.district === district).forEach(t => {
      group.appendChild(new Option(t.town, forSearch ? `town:${t.town}` : t.town));
    });
    select.appendChild(group);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateAreaSelect(document.getElementById("search-location"), true);
  populateAreaSelect(document.getElementById("market-location"), true);
  populateAreaSelect(document.getElementById("listing-location-select"), false);
});

// Shared UI helper: not every modal has a footer (the List an Asset modal on the
// home and marketplace pages keeps its buttons inside the form).
function setModalFooterDisplay(modal, display) {
  const footer = modal && modal.querySelector(".modal-footer");
  if (footer) footer.style.display = display;
}

// Only the visible rent-mode inputs of the quick booking modal may be required;
// a required input that is hidden stops the form from submitting.
function setBookingInputsRequired(mode) {
  document.querySelectorAll("#modal-booking-daily-inputs input").forEach(input => input.required = mode === "daily");
  document.querySelectorAll("#modal-booking-hourly-inputs input").forEach(input => input.required = mode === "hourly");
}

// Everything the demo saves in the browser; cleared by the dashboard's "Reset Demo Data" button
const DEMO_STORAGE_KEYS = [USER_LISTINGS_KEY, "hostListings", "bookingRequests", "completedBookings", "dashboardStats", "dashboardNotifications"];

function resetDemoData() {
  DEMO_STORAGE_KEYS.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // Storage unavailable: nothing to clear
    }
  });
}
