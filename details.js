// ============================================================================
// DEMO MOCK NOTE: 
// In a clean production app, dynamic data loading using predictable client-side IDs
// (e.g. ?id=1) without authorization checks exposes the system to Insecure Direct
// Object References (IDOR/BOLA). A secure backend API must enforce role-based
// access control and authenticate every database query request.
// ============================================================================

let wishlist = new Set();
let currentAsset = null;
let currentRentMode = "daily";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  loadAssetDetails();
  initModals();
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

// 2. DYNAMICALLY RENDER ASSET DETAILS
function loadAssetDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const assetId = parseInt(urlParams.get("id")) || 1;
  
  currentAsset = listingsDatabase.find(item => item.id === assetId) || listingsDatabase[0];
  
  // Set window title
  document.title = `${currentAsset.title} | Util Lanka`;
  
  // Populate Title & Header Details
  document.getElementById("asset-title").textContent = currentAsset.title;
  document.getElementById("asset-category-badge").textContent = capitalizeFirstLetter(currentAsset.category);
  document.getElementById("asset-rating-val").textContent = currentAsset.rating.toFixed(2);
  document.getElementById("asset-reviews-count").textContent = `(${currentAsset.reviews} reviews)`;
  document.getElementById("asset-address").textContent = currentAsset.location;
  
  // Render Badges
  const badgesContainer = document.getElementById("asset-header-badges");
  badgesContainer.innerHTML = "";
  if (currentAsset.labels) {
    currentAsset.labels.forEach(lbl => {
      const badgeSpan = document.createElement("span");
      badgeSpan.className = `detail-badge badge-${lbl.toLowerCase().replace(/\s+/g, "-")}`;
      
      let icon = "";
      if (lbl === "Available Today") {
        icon = "● ";
        badgeSpan.style.backgroundColor = "var(--primary-green)";
      } else if (lbl === "Verified Owner") {
        icon = "✓ ";
        badgeSpan.style.backgroundColor = "var(--primary-dark)";
      } else {
        icon = "★ ";
        badgeSpan.style.backgroundColor = "var(--accent-teal)";
      }
      
      badgeSpan.textContent = icon + lbl;
      badgeSpan.style.color = "white";
      badgeSpan.style.padding = "0.3rem 0.75rem";
      badgeSpan.style.borderRadius = "var(--radius-sm)";
      badgeSpan.style.fontSize = "0.75rem";
      badgeSpan.style.fontWeight = "700";
      badgeSpan.style.textTransform = "uppercase";
      badgesContainer.appendChild(badgeSpan);
    });
  }
  
  // Populate Gallery
  const mainImg = document.getElementById("gallery-main-img");
  const thumb1 = document.getElementById("gallery-thumb-1");
  const thumb2 = document.getElementById("gallery-thumb-2");
  
  if (currentAsset.images && currentAsset.images.length >= 3) {
    mainImg.src = currentAsset.images[0];
    mainImg.alt = currentAsset.title;
    thumb1.src = currentAsset.images[1];
    thumb2.src = currentAsset.images[2];
  } else if (currentAsset.images && currentAsset.images.length > 0) {
    // User-published listing with 1-2 photos: reuse them to fill the thumbnails
    const photos = currentAsset.images;
    mainImg.src = photos[0];
    mainImg.alt = currentAsset.title;
    thumb1.src = photos[1 % photos.length];
    thumb2.src = photos[2 % photos.length];
  } else {
    mainImg.src = currentAsset.image;
    mainImg.alt = currentAsset.title;
    thumb1.src = "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80";
    thumb2.src = "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80";
  }
  
  // Populate Description
  document.getElementById("asset-description").textContent = currentAsset.description;
  
  // Populate Specs List
  const specsContainer = document.getElementById("asset-specs-grid");
  specsContainer.innerHTML = "";
  Object.entries(currentAsset.specs).forEach(([key, val]) => {
    const specDiv = document.createElement("div");
    specDiv.className = "spec-card";
    specDiv.innerHTML = `
      <span class="spec-label">${capitalizeFirstLetter(key)}</span>
      <span class="spec-value">${val}</span>
    `;
    specsContainer.appendChild(specDiv);
  });
  
  // Populate Host Profile
  const host = currentAsset.host || { name: "Shalini Alwis", joined: "Joined Oct 2025", responseRate: "100%", responseTime: "under 15 mins", avatar: "S" };
  document.getElementById("host-avatar-initial").textContent = host.avatar;
  document.getElementById("host-name").textContent = `Hosted by ${host.name}`;
  document.getElementById("host-joined").textContent = host.joined;
  document.getElementById("host-response-rate").textContent = `Response Rate: ${host.responseRate}`;
  document.getElementById("host-response-time").textContent = `Response Time: ${host.responseTime}`;
  
  // Populate Booking Card Price
  document.getElementById("booking-card-price").textContent = `LKR ${currentAsset.price.toLocaleString()}`;
  document.getElementById("booking-card-unit").textContent = `/ ${currentAsset.unit}`;
  document.getElementById("booking-card-rating").textContent = currentAsset.rating.toFixed(2);
  document.getElementById("booking-card-reviews").textContent = `(${currentAsset.reviews} reviews)`;
  
  // Populate Reviews List
  const reviewsContainer = document.getElementById("reviews-list-container");
  reviewsContainer.innerHTML = "";
  const reviewsList = currentAsset.reviewsList || [
    { author: "Thilak S.", rating: 5, date: "May 2026", comment: "Excellent facility. Extremely clean, and all equipment was fully functional. Ideal for our catering orders." },
    { author: "Nirmala R.", rating: 4.8, date: "April 2026", comment: "Very convenient location near the teaching hospital. Clean counters and reliable gas supply. Will rent again." }
  ];

  if (reviewsList.length === 0) {
    reviewsContainer.innerHTML = `<p class="review-comment">No reviews yet. Be the first to rent this asset!</p>`;
  }

  reviewsList.forEach(rev => {
    const revDiv = document.createElement("div");
    revDiv.className = "review-item";
    
    let starsHtml = "";
    const floorRating = Math.floor(rev.rating);
    for (let i = 0; i < 5; i++) {
      if (i < floorRating) {
        starsHtml += `<span style="color: #F59E0B;">★</span>`;
      } else {
        starsHtml += `<span style="color: #CBD5E1;">★</span>`;
      }
    }
    
    revDiv.innerHTML = `
      <div class="review-header">
        <div class="review-author-meta">
          <div class="review-author-avatar">${rev.author.charAt(0)}</div>
          <div>
            <h5 class="review-author-name">${rev.author}</h5>
            <span class="review-date">${rev.date}</span>
          </div>
        </div>
        <div class="review-rating-stars">${starsHtml}</div>
      </div>
      <p class="review-comment">"${rev.comment}"</p>
    `;
    reviewsContainer.appendChild(revDiv);
  });
  
  // Initialize date limits
  const today = new Date().toISOString().split("T")[0];
  const startDateInput = document.getElementById("booking-start-date");
  const endDateInput = document.getElementById("booking-end-date");
  
  // Set alternative price display
  const altPriceSpan = document.getElementById("booking-card-alt-price");
  if (altPriceSpan) {
    if (currentAsset.priceHourly) {
      altPriceSpan.textContent = `or LKR ${currentAsset.priceHourly.toLocaleString()} / hour`;
      altPriceSpan.style.display = "block";
    } else {
      altPriceSpan.style.display = "none";
    }
  }

  // Toggle Daily vs Hourly inputs
  const btnRentDaily = document.getElementById("btn-rent-daily");
  const btnRentHourly = document.getElementById("btn-rent-hourly");
  const dailyInputs = document.getElementById("booking-daily-inputs");
  const hourlyInputs = document.getElementById("booking-hourly-inputs");

  if (btnRentDaily && btnRentHourly) {
    btnRentDaily.addEventListener("click", () => {
      currentRentMode = "daily";
      btnRentDaily.style.background = "var(--primary-dark)";
      btnRentDaily.style.color = "white";
      btnRentHourly.style.background = "transparent";
      btnRentHourly.style.color = "var(--text-light)";
      if (dailyInputs) dailyInputs.style.display = "grid";
      if (hourlyInputs) hourlyInputs.style.display = "none";
      
      // Update price display to daily
      document.getElementById("booking-card-price").textContent = `LKR ${currentAsset.price.toLocaleString()}`;
      document.getElementById("booking-card-unit").textContent = `/ ${currentAsset.unit}`;
      if (altPriceSpan && currentAsset.priceHourly) {
        altPriceSpan.textContent = `or LKR ${currentAsset.priceHourly.toLocaleString()} / hour`;
      }
      recalculateTotals();
    });

    btnRentHourly.addEventListener("click", () => {
      currentRentMode = "hourly";
      btnRentHourly.style.background = "var(--primary-dark)";
      btnRentHourly.style.color = "white";
      btnRentDaily.style.background = "transparent";
      btnRentDaily.style.color = "var(--text-light)";
      if (dailyInputs) dailyInputs.style.display = "none";
      if (hourlyInputs) hourlyInputs.style.display = "block";
      
      // Update price display to hourly
      const hrPrice = currentAsset.priceHourly || Math.round(currentAsset.price / 8);
      document.getElementById("booking-card-price").textContent = `LKR ${hrPrice.toLocaleString()}`;
      document.getElementById("booking-card-unit").textContent = `/ hour`;
      if (altPriceSpan) {
        altPriceSpan.textContent = `or LKR ${currentAsset.price.toLocaleString()} / ${currentAsset.unit}`;
      }
      recalculateTotals();
    });
  }

  if (startDateInput && endDateInput) {
    startDateInput.min = today;
    startDateInput.value = today;
    
    // Default check-out tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split("T")[0];
    endDateInput.min = tomorrowStr;
    endDateInput.value = tomorrowStr;
    
    // Add change listeners
    startDateInput.addEventListener("change", () => {
      endDateInput.min = startDateInput.value;
      if (endDateInput.value < startDateInput.value) {
        endDateInput.value = startDateInput.value;
      }
      recalculateTotals();
    });
    
    endDateInput.addEventListener("change", recalculateTotals);
  }

  // Set today for hourly date input
  const rentDateInput = document.getElementById("booking-rent-date");
  const rentTimeInput = document.getElementById("booking-rent-time");
  const rentHoursInput = document.getElementById("booking-rent-hours");
  if (rentDateInput) {
    rentDateInput.min = today;
    rentDateInput.value = today;
    rentDateInput.addEventListener("change", recalculateTotals);
  }
  if (rentTimeInput) rentTimeInput.addEventListener("change", recalculateTotals);
  if (rentHoursInput) {
    rentHoursInput.addEventListener("input", recalculateTotals);
    rentHoursInput.addEventListener("change", recalculateTotals);
  }

  recalculateTotals();
}

// 3. RECALCULATE DYNAMIC TOTALS
function recalculateTotals() {
  if (!currentAsset) return;
  
  const startDateInput = document.getElementById("booking-start-date");
  const endDateInput = document.getElementById("booking-end-date");
  
  if (!startDateInput || !endDateInput) return;
  
  let baseCost = 0;
  let deposit = 0;
  let duration = 1;

  if (currentRentMode === "daily") {
    const start = new Date(startDateInput.value);
    const end = new Date(endDateInput.value);
    if (currentAsset.unit === "month") {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      duration = Math.max(1, months || 1);
    } else {
      const diffTime = Math.abs(end - start);
      duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    }
    baseCost = currentAsset.price * duration;
    deposit = Math.round(currentAsset.price * 0.5);
    document.getElementById("summary-duration-label").innerHTML = `LKR ${currentAsset.price.toLocaleString()} &times; ${duration} ${currentAsset.unit}(s)`;
  } else {
    const hours = parseInt(document.getElementById("booking-rent-hours").value) || 1;
    const hrPrice = currentAsset.priceHourly || Math.round(currentAsset.price / 8);
    baseCost = hrPrice * hours;
    deposit = Math.round(hrPrice * hours * 0.5);
    document.getElementById("summary-duration-label").innerHTML = `LKR ${hrPrice.toLocaleString()} &times; ${hours} hour(s)`;
  }
  
  const platformFee = Math.round(baseCost * 0.05);
  const grandTotal = baseCost + platformFee + deposit;
  
  document.getElementById("summary-base-total").textContent = `LKR ${baseCost.toLocaleString()}`;
  document.getElementById("summary-platform-fee").textContent = `LKR ${platformFee.toLocaleString()}`;
  document.getElementById("summary-deposit").textContent = `LKR ${deposit.toLocaleString()}`;
  document.getElementById("summary-grand-total").textContent = `LKR ${grandTotal.toLocaleString()}`;
}

// 4. MODALS AND BOOKING SUBMIT SIMULATION
function initModals() {
  const modalOverlays = document.querySelectorAll(".modal-overlay");
  const closeBtns = document.querySelectorAll(".modal-close");
  
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => closeAllModals());
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  // Open List Asset Modal
  const listAssetBtns = document.querySelectorAll(".list-asset-trigger");
  listAssetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById("list-asset-modal");
      document.getElementById("listing-form-content").style.display = "block";
      document.getElementById("listing-success-content").style.display = "none";
      setModalFooterDisplay(modal, "flex");
      modal.classList.add("active");
    });
  });

  // Booking Card Submit - Redirects to Checkout
  const bookingBtn = document.getElementById("booking-btn");
  if (bookingBtn) {
    bookingBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const userName = document.getElementById("booking-user-name").value.trim();
      const userPhone = document.getElementById("booking-user-contact").value.trim();
      
      if (!userName || !userPhone) {
        alert("Please provide your Name and Mobile Number to check availability.");
        document.getElementById("booking-user-name").focus();
        return;
      }

      let checkoutUrl = `checkout.html?id=${currentAsset.id}&name=${encodeURIComponent(userName)}&phone=${encodeURIComponent(userPhone)}`;
      
      if (currentRentMode === "daily") {
        const start = document.getElementById("booking-start-date").value;
        const end = document.getElementById("booking-end-date").value;
        checkoutUrl += `&rentMode=daily&start=${start}&end=${end}`;
      } else {
        const start = document.getElementById("booking-rent-date").value;
        const time = document.getElementById("booking-rent-time").value;
        const hours = document.getElementById("booking-rent-hours").value;
        checkoutUrl += `&rentMode=hourly&start=${start}&time=${time}&hours=${hours}`;
      }
      
      const originalText = bookingBtn.innerHTML;
      bookingBtn.disabled = true;
      bookingBtn.innerHTML = `<svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px; display: inline-block; vertical-align: middle;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Redirecting...`;
      
      setTimeout(() => {
        bookingBtn.disabled = false;
        bookingBtn.innerHTML = originalText;
        window.location.href = checkoutUrl;
      }, 1000);
    });
  }

  // Listing Form submit
  const listingForm = document.getElementById("modal-listing-form");
  if (listingForm) {
    listingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = listingForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      const title = document.getElementById("listing-title-input").value;
      const category = document.getElementById("listing-category-select").value;
      const location = document.getElementById("listing-location-select").value;
      const price = parseInt(document.getElementById("listing-price-input").value);
      const unit = document.getElementById("listing-unit-select").value;
      const description = document.getElementById("listing-desc-input").value;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Publishing...`;

      // Read the uploaded photos while the spinner shows (listingForm.reset() below clears them)
      const imagesReady = getListingImages();
      const minDelay = new Promise(resolve => setTimeout(resolve, 1500));

      Promise.all([imagesReady, minDelay]).then(([images]) => {
        publishListing({ title, category, location, price, unit, description }, images);

        document.getElementById("listing-form-content").style.display = "none";
        document.getElementById("listing-success-content").style.display = "block";
        setModalFooterDisplay(document.getElementById("list-asset-modal"), "none");
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        listingForm.reset();
      });
    });
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.classList.remove("active");
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Add dynamic spinner rotation style if needed
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
