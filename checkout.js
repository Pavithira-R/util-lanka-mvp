// ============================================================================
// DEMO MOCK NOTE: 
// In a clean production app, billing calculations (fees, rates, totals) must
// be performed entirely on a secure backend. Relying on client-side JS parameters
// (such as URL parameters or memory state variables) is insecure and allows users
// to manipulate prices before payment execution.
// ============================================================================

// Listings Database containing localized Northern Province assets and detailed street addresses
const listingsDatabase = [
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
    specs: { size: "450 sqft", capacity: "8 chefs", power: "3-Phase Power" },
    image: "assets/Commercial Cloud Kitchen Space.jpeg",
    host: {
      name: "Shalini Alwis",
      phone: "+94 77 987 6543",
      email: "shalini.a@utillanka.lk"
    }
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
    specs: { size: "500kg Payload", capacity: "5 passengers", fuel: "Petrol" },
    image: "assets/Suzuki Every Mini Van (Dual AC).jpg",
    host: {
      name: "Ravi Kumara",
      phone: "+94 76 111 2233",
      email: "ravi.k@utillanka.lk"
    }
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
    specs: { engine: "200cc Petrol", capacity: "3 passengers", transmission: "Manual" },
    image: "assets/Three-Wheel Tuk-Tuk (Bajaj RE).jpg",
    host: {
      name: "Arul Sundaram",
      phone: "+94 77 222 3344",
      email: "arul.s@utillanka.lk"
    }
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
    specs: { output: "35 kVA", fuel: "Diesel", type: "Soundproof" },
    image: "assets/35 kVA Soundproof Diesel Generator.jpeg",
    host: {
      name: "Suresh Perera",
      phone: "+94 71 333 4455",
      email: "suresh.p@utillanka.lk"
    }
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
    specs: { speakers: "4x JBL 15\"", mixer: "12-Channel", mic: "2x Wireless" },
    image: "assets/Professional Outdoor Sound & PA System.webp",
    host: {
      name: "Selvaraj M.",
      phone: "+94 77 444 5566",
      email: "selva.m@utillanka.lk"
    }
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
    specs: { size: "300 sqft", access: "24/7 Access", security: "Padlocked Gate" },
    image: "assets/Secure Dry Storage Room (15x20 ft).jpeg",
    host: {
      name: "Mohammed N.",
      phone: "+94 75 555 6677",
      email: "mohd.n@utillanka.lk"
    }
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
    specs: { security: "CCTV/Guard", proximity: "Station (200m)", type: "Open Yard" },
    image: "assets/Gated Commercial Parking Space.jpg",
    host: {
      name: "Thilak Subasinghe",
      phone: "+94 77 666 7788",
      email: "thilak.s@utillanka.lk"
    }
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
    specs: { type: "Double Deck", capacity: "4 Trays", fuel: "LPG Gas" },
    image: "assets/Commercial Deck Bakery Oven (Gas).jpg",
    host: {
      name: "Anton Pillai",
      phone: "+94 72 777 8899",
      email: "anton.p@utillanka.lk"
    }
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
    specs: { type: "100cc Eco", luggage: "Rear Carrier box", transmission: "Manual" },
    image: "assets/Motorbike Delivery Bike.jpeg",
    host: {
      name: "Arul Sundaram",
      phone: "+94 77 222 3344",
      email: "arul.s@utillanka.lk"
    }
  }
];

let currentAsset = null;
let currentDuration = 1;
let rentMode = "daily";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  loadCheckoutDetails();
  initPaymentSelection();
  initFormSubmit();
});

// 1. MOBILE DRAWER NAVIGATION
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector(".header");
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("active");
      header.classList.toggle("menu-open", isOpen);
      
      menuToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
        mobileMenu.classList.remove("active");
        header.classList.remove("menu-open");
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });
  }
}

// 2. LOAD URL PARAMETERS & RENDER DATA
function loadCheckoutDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = parseInt(urlParams.get("id")) || 1;
  const start = urlParams.get("start") || new Date().toISOString().split("T")[0];
  rentMode = urlParams.get("rentMode") || "daily";
  
  // End Date defaults to 1 day after start if not provided
  let end = urlParams.get("end");
  if (!end) {
    const tomorrow = new Date(start);
    tomorrow.setDate(tomorrow.getDate() + 1);
    end = tomorrow.toISOString().split("T")[0];
  }
  
  const time = urlParams.get("time") || "09:00";
  const hours = parseInt(urlParams.get("hours")) || 4;
  const name = urlParams.get("name") || "";
  const phone = urlParams.get("phone") || "";

  currentAsset = listingsDatabase.find(item => item.id === assetId) || listingsDatabase[0];

  // Fill in Form Inputs based on rentMode
  if (rentMode === "daily") {
    document.getElementById("checkout-daily-schedule").style.display = "grid";
    document.getElementById("checkout-hourly-schedule").style.display = "none";
    
    document.getElementById("checkout-start-date").value = start;
    document.getElementById("checkout-end-date").value = end;
    document.getElementById("checkout-start-date").min = new Date().toISOString().split("T")[0];
    document.getElementById("checkout-end-date").min = start;
  } else {
    document.getElementById("checkout-daily-schedule").style.display = "none";
    document.getElementById("checkout-hourly-schedule").style.display = "block";
    
    document.getElementById("checkout-rent-date").value = start;
    document.getElementById("checkout-rent-date").min = new Date().toISOString().split("T")[0];
    document.getElementById("checkout-rent-time").value = time;
    document.getElementById("checkout-rent-hours").value = hours;
  }
  
  document.getElementById("user-name").value = name;
  document.getElementById("user-phone").value = phone;

  // Fill in Summary Card
  document.getElementById("summary-img").src = currentAsset.image;
  document.getElementById("summary-img").alt = currentAsset.title;
  document.getElementById("summary-title").textContent = currentAsset.title;
  document.getElementById("summary-address").textContent = currentAsset.location;
  document.getElementById("summary-rating").textContent = currentAsset.rating.toFixed(2);
  document.getElementById("summary-reviews").textContent = `(${currentAsset.reviews} reviews)`;

  // Add listener to recalculate duration limits
  document.getElementById("checkout-start-date").addEventListener("change", () => {
    document.getElementById("checkout-end-date").min = document.getElementById("checkout-start-date").value;
    if (document.getElementById("checkout-end-date").value < document.getElementById("checkout-start-date").value) {
      document.getElementById("checkout-end-date").value = document.getElementById("checkout-start-date").value;
    }
    recalculateTotals();
  });
  
  document.getElementById("checkout-end-date").addEventListener("change", recalculateTotals);
  
  // Add change listeners for hourly mode inputs
  document.getElementById("checkout-rent-date").addEventListener("change", recalculateTotals);
  document.getElementById("checkout-rent-time").addEventListener("change", recalculateTotals);
  document.getElementById("checkout-rent-hours").addEventListener("input", recalculateTotals);
  document.getElementById("checkout-rent-hours").addEventListener("change", recalculateTotals);

  recalculateTotals();
}

// 3. RECALCULATE BILLING DETAILS
function recalculateTotals() {
  if (!currentAsset) return;

  let baseCost = 0;
  let platformFee = 0;
  let deposit = 0;
  let grandTotal = 0;

  if (rentMode === "daily") {
    const startVal = document.getElementById("checkout-start-date").value;
    const endVal = document.getElementById("checkout-end-date").value;

    const start = new Date(startVal);
    const end = new Date(endVal);

    if (currentAsset.unit === "month") {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      currentDuration = Math.max(1, months || 1);
    } else {
      const diffTime = Math.abs(end - start);
      currentDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }

    baseCost = currentAsset.price * currentDuration;
    platformFee = Math.round(baseCost * 0.05);
    deposit = Math.round(currentAsset.price * 0.5);
    grandTotal = baseCost + platformFee + deposit;

    // Update Summary Sidebar Elements
    document.getElementById("summary-dates-label").textContent = `${formatDateStr(startVal)} - ${formatDateStr(endVal)}`;
    document.getElementById("summary-duration-label").textContent = `${currentDuration} ${currentAsset.unit}(s)`;
    document.getElementById("price-item-label").innerHTML = `LKR ${currentAsset.price.toLocaleString()} &times; ${currentDuration} ${currentAsset.unit}(s)`;
  } else {
    const dateVal = document.getElementById("checkout-rent-date").value;
    const timeVal = document.getElementById("checkout-rent-time").value;
    currentDuration = parseInt(document.getElementById("checkout-rent-hours").value) || 1;

    const hrPrice = currentAsset.priceHourly || Math.round(currentAsset.price / 8);
    baseCost = hrPrice * currentDuration;
    platformFee = Math.round(baseCost * 0.05);
    deposit = Math.round(hrPrice * currentDuration * 0.5);
    grandTotal = baseCost + platformFee + deposit;

    // Update Summary Sidebar Elements
    document.getElementById("summary-dates-label").textContent = `${formatDateStr(dateVal)} at ${timeVal}`;
    document.getElementById("summary-duration-label").textContent = `${currentDuration} hour(s)`;
    document.getElementById("price-item-label").innerHTML = `LKR ${hrPrice.toLocaleString()} &times; ${currentDuration} hour(s)`;
  }

  document.getElementById("price-item-total").textContent = `LKR ${baseCost.toLocaleString()}`;
  document.getElementById("platform-fee-total").textContent = `LKR ${platformFee.toLocaleString()}`;
  document.getElementById("deposit-total").textContent = `LKR ${deposit.toLocaleString()}`;
  document.getElementById("grand-total-amount").textContent = `LKR ${grandTotal.toLocaleString()}`;
}

// 4. PAYMENT METHOD TOGGLE LOGIC
function initPaymentSelection() {
  const payCards = document.querySelectorAll(".payment-card");
  const infoBlocks = document.querySelectorAll(".payment-info-block");

  payCards.forEach(card => {
    card.addEventListener("click", () => {
      // Remove active from all cards
      payCards.forEach(c => c.classList.remove("active"));
      // Add active to clicked
      card.classList.add("active");

      // Hide all info blocks
      infoBlocks.forEach(block => block.style.display = "none");
      // Show matching block
      const method = card.getAttribute("data-method");
      document.getElementById(`info-${method}`).style.display = "block";
    });
  });
}

// 5. FORM SUBMISSION AND SUCCESS SCREEN
function initFormSubmit() {
  const form = document.getElementById("checkout-booking-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById("btn-confirm-booking");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Sending Confirmation Request...`;

      setTimeout(() => {
        // Generate values
        const refCode = "UTL-" + Math.floor(100000 + Math.random() * 900000);
        
        // Hide Main Checkout Panel
        document.getElementById("main-checkout-section").style.display = "none";
        
        // Populate Success Screen Elements
        document.getElementById("success-ref-code").innerHTML = `<strong>Reference ID:</strong> ${refCode}`;
        
        // Populate Host Details
        const hostName = currentAsset.host ? currentAsset.host.name : "Shalini Alwis";
        const hostPhone = currentAsset.host ? currentAsset.host.phone : "+94 77 987 6543";
        const hostEmail = currentAsset.host ? currentAsset.host.email : "shalini.a@utillanka.lk";
        
        document.getElementById("success-owner-name").textContent = hostName;
        document.getElementById("success-owner-phone").textContent = `Phone: ${hostPhone}`;
        document.getElementById("success-owner-email").textContent = `Email: ${hostEmail}`;

        // Populate Summary details
        document.getElementById("success-summary-title").textContent = currentAsset.title;
        document.getElementById("success-summary-address").textContent = currentAsset.location;
        
        if (rentMode === "daily") {
          document.getElementById("success-summary-duration").textContent = `${currentDuration} ${currentAsset.unit}(s)`;
          const startVal = document.getElementById("checkout-start-date").value;
          const endVal = document.getElementById("checkout-end-date").value;
          document.getElementById("success-summary-dates").textContent = `${formatDateStr(startVal)} - ${formatDateStr(endVal)}`;
        } else {
          document.getElementById("success-summary-duration").textContent = `${currentDuration} hour(s)`;
          const dateVal = document.getElementById("checkout-rent-date").value;
          const timeVal = document.getElementById("checkout-rent-time").value;
          document.getElementById("success-summary-dates").textContent = `${formatDateStr(dateVal)} at ${timeVal}`;
        }
        
        // Display Success Screen Section
        document.getElementById("success-confirmation-section").style.display = "block";
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Enable button back
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  }
}

function formatDateStr(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

// Dynamic styling for animations
if (!document.getElementById("spin-style-marker")) {
  const spinStyle = document.createElement('style');
  spinStyle.id = "spin-style-marker";
  spinStyle.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);
}
