// ============================================================================
// DEMO MOCK NOTE: 
// In a clean production app, billing calculations (fees, rates, totals) must
// be performed entirely on a secure backend. Relying on client-side JS parameters
// (such as URL parameters or memory state variables) is insecure and allows users
// to manipulate prices before payment execution.
// ============================================================================

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
  const nic = urlParams.get("nic") || "";

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
  document.getElementById("user-nic").value = nic;

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

      const name = document.getElementById("user-name").value.trim();
      const phone = document.getElementById("user-phone").value.trim();
      const nicVal = document.getElementById("user-nic").value.trim();

      // Sri Lankan NIC verification formats:
      // Old Format: 9 digits followed by V or X (case insensitive)
      // New Format: 12 digits
      const oldNicRegex = /^[0-9]{9}[vVxX]$/;
      const newNicRegex = /^[0-9]{12}$/;

      if (!oldNicRegex.test(nicVal) && !newNicRegex.test(nicVal)) {
        alert("Verification Failed: Please enter a valid Sri Lankan National Identity Card (NIC) number.\n\nAllowed formats:\n- Old: 9 digits followed by 'V' or 'X' (e.g. 951234567V)\n- New: 12 digits (e.g. 199512345678)");
        document.getElementById("user-nic").focus();
        return;
      }

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
        document.getElementById("success-summary-nic").textContent = nicVal;
        
        let summaryDatesText = "";
        if (rentMode === "daily") {
          document.getElementById("success-summary-duration").textContent = `${currentDuration} ${currentAsset.unit}(s)`;
          const startVal = document.getElementById("checkout-start-date").value;
          const endVal = document.getElementById("checkout-end-date").value;
          summaryDatesText = `${formatDateStr(startVal)} - ${formatDateStr(endVal)}`;
          document.getElementById("success-summary-dates").textContent = summaryDatesText;
        } else {
          document.getElementById("success-summary-duration").textContent = `${currentDuration} hour(s)`;
          const dateVal = document.getElementById("checkout-rent-date").value;
          const timeVal = document.getElementById("checkout-rent-time").value;
          summaryDatesText = `${formatDateStr(dateVal)} at ${timeVal}`;
          document.getElementById("success-summary-dates").textContent = summaryDatesText;
        }

        // Save new booking request to localStorage for Host Dashboard integration
        try {
          const baseTotalText = document.getElementById("price-item-total").textContent;
          const numericPrice = parseInt(baseTotalText.replace(/[^0-9]/g, "")) || 0;

          // Retain mock data format
          const newRequest = {
            id: Math.floor(100 + Math.random() * 900),
            renter: name,
            renterNic: nicVal,
            renterPhone: phone,
            assetId: currentAsset.id,
            assetTitle: currentAsset.title,
            dates: summaryDatesText,
            duration: currentDuration,
            price: numericPrice,
            status: "Pending",
            rentMode: rentMode
          };

          // Append to existing localStorage list
          let localRequests = JSON.parse(localStorage.getItem("bookingRequests"));
          // If dashboard has not loaded yet, we want to start with default mock requests as seed
          if (!localRequests) {
            localRequests = [
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
          }
          localRequests.unshift(newRequest);
          localStorage.setItem("bookingRequests", JSON.stringify(localRequests));

          // Increment host dashboard pending request statistics
          let localStats = JSON.parse(localStorage.getItem("dashboardStats")) || {
            totalListings: 4,
            activeBookings: 2,
            monthlyEarnings: 24500,
            pendingRequests: 3
          };
          localStats.pendingRequests += 1;
          localStorage.setItem("dashboardStats", JSON.stringify(localStats));

          // Log dynamic activity notification
          let localNotifs = JSON.parse(localStorage.getItem("dashboardNotifications")) || [
            { time: "Just now", text: "New booking request from Selva R. for Generator" },
            { time: "1 hour ago", text: "NIC Profile Verification approved by Util Lanka team" },
            { time: "Yesterday", text: "Payout of LKR 14,000 processed to Bank of Ceylon account" },
            { time: "2 days ago", text: "New 5-star review received from Mahen T. for Mini Van" }
          ];
          localNotifs.unshift({
            time: "Just now",
            text: `New booking request from ${name} for ${currentAsset.title}`
          });
          localStorage.setItem("dashboardNotifications", JSON.stringify(localNotifs));

        } catch (err) {
          console.error("Local storage error:", err);
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
