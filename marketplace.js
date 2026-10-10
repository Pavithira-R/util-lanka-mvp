let wishlist = new Set();
let currentBookingListing = null;
let modalRentMode = "daily";

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  renderMarketplace(listingsDatabase);
  initSearch();
  initSidebarFilters();
  initModals();
  initSort();
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

// 2. RENDER THE MARKETPLACE LISTING CARDS
function renderMarketplace(listings) {
  const container = document.getElementById("marketplace-grid-container");
  const counter = document.getElementById("results-counter");
  if (!container) return;
  
  counter.textContent = listings.length === 1 
    ? "Showing 1 shared asset" 
    : `Showing ${listings.length} shared assets`;
    
  if (listings.length === 0) {
    container.innerHTML = `
      <div class="no-listings-found" style="grid-column: 1 / -1;">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3>No Assets Found</h3>
        <p>No listings matched your criteria. Try resetting the filters or modifying your search.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = listings.map(item => {
    // Generate overlay label badges
    let badgesHtml = "";
    if (item.labels && item.labels.length > 0) {
      badgesHtml = `<div class="card-badges-container">` + item.labels.map(lbl => {
        let labelClass = "label-trusted";
        if (lbl === "Available Today") labelClass = "label-today";
        else if (lbl === "Verified Owner") labelClass = "label-owner";
        else if (lbl === "Most Booked") labelClass = "label-booked";
        return `<span class="card-label-badge ${labelClass}">${lbl}</span>`;
      }).join("") + `</div>`;
    }

    const isFav = wishlist.has(item.id) ? "active" : "";
    const heartFill = wishlist.has(item.id) ? "currentColor" : "none";
    
    return `
      <div class="listing-card" data-id="${item.id}">
        <div class="listing-image-container">
          ${badgesHtml}
          <a href="details.html?id=${item.id}">
            <img class="listing-img" src="${item.image}" alt="${item.title}" loading="lazy" />
          </a>
          <button class="listing-wishlist-btn ${isFav}" aria-label="Add to wishlist" data-id="${item.id}">
            <svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${heartFill}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
            </svg>
          </button>
          <span class="badge badge-teal listing-category-badge">${capitalizeFirstLetter(item.category)}</span>
        </div>
        
        <div class="listing-content">
          <div class="listing-meta">
            <span class="listing-location" title="${item.location}">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${item.location}
            </span>
            <span class="listing-rating">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              ${item.rating} <span style="font-size:0.725rem; color:var(--text-light); font-weight:400;">(${item.reviews})</span>
            </span>
          </div>
          
          <a href="details.html?id=${item.id}" style="color: inherit; text-decoration: none;">
            <h3 class="listing-title">${item.title}</h3>
          </a>
          
          <div class="listing-specs">
            <div class="listing-spec-item">
              <span><strong>${capitalizeFirstLetter(Object.keys(item.specs)[0])}:</strong> ${Object.values(item.specs)[0]}</span>
            </div>
            <div class="listing-spec-item">
              <span><strong>${capitalizeFirstLetter(Object.keys(item.specs)[1])}:</strong> ${Object.values(item.specs)[1]}</span>
            </div>
          </div>
          
          <div class="listing-price-container">
            <div class="listing-price">
              LKR ${item.price.toLocaleString()}<span> / ${item.unit}</span>
            </div>
            <button class="btn btn-secondary btn-sm book-now-btn" data-id="${item.id}" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: var(--radius-md);">
              Book Now
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  attachListingEvents();
}

function attachListingEvents() {
  const wishlistBtns = document.querySelectorAll(".listing-wishlist-btn");
  wishlistBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const listingId = parseInt(btn.getAttribute("data-id"));
      const heart = btn.querySelector(".heart-icon");
      
      if (wishlist.has(listingId)) {
        wishlist.delete(listingId);
        btn.classList.remove("active");
        heart.setAttribute("fill", "none");
      } else {
        wishlist.add(listingId);
        btn.classList.add("active");
        heart.setAttribute("fill", "currentColor");
      }
    });
  });

  const bookBtns = document.querySelectorAll(".book-now-btn");
  bookBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const listingId = parseInt(btn.getAttribute("data-id"));
      openBookingModal(listingId);
    });
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// 3. ADVANCED SEARCH FILTERING
function initSearch() {
  const form = document.getElementById("marketplace-search-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      applyAllFilters();
    });
  }
}

// 4. SIDEBAR FILTER HANDLERS
function initSidebarFilters() {
  const form = document.getElementById("sidebar-filters-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      applyAllFilters();
    });
  }

  const resetBtn = document.getElementById("btn-reset-filters");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      document.getElementById("marketplace-search-form").reset();
      form.reset();
      renderMarketplace(listingsDatabase);
    });
  }
}

function applyAllFilters() {
  const keyword = document.getElementById("market-keyword").value.toLowerCase().trim();
  const location = document.getElementById("market-location").value;
  const topCategory = document.getElementById("market-category").value;
  
  // Sidebar checked categories
  const checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(el => el.value);
  
  const minPrice = parseInt(document.getElementById("filter-price-min").value) || 0;
  const maxPrice = parseInt(document.getElementById("filter-price-max").value) || Infinity;
  
  const availToday = document.getElementById("filter-avail-today").checked;
  const verifiedOwner = document.getElementById("filter-verified-owner").checked;
  const communityTrusted = document.getElementById("filter-community-trusted").checked;

  let filtered = listingsDatabase.filter(item => {
    // 1. Keyword
    const matchesKeyword = !keyword || 
      item.title.toLowerCase().includes(keyword) || 
      item.description.toLowerCase().includes(keyword);
      
    // 2. Location (Substring Match)
    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());
    
    // 3. Category (Top select OR checked boxes)
    let matchesCategory = true;
    if (topCategory) {
      matchesCategory = item.category === topCategory;
    } else if (checkedCategories.length > 0) {
      matchesCategory = checkedCategories.includes(item.category);
    }
    
    // 4. Price range
    const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
    
    // 5. Trust Labels Check
    let matchesAvail = !availToday || (item.labels && item.labels.includes("Available Today"));
    let matchesVerified = !verifiedOwner || (item.labels && item.labels.includes("Verified Owner"));
    let matchesTrusted = !communityTrusted || (item.labels && item.labels.includes("Community Trusted"));
    
    return matchesKeyword && matchesLocation && matchesCategory && matchesPrice && matchesAvail && matchesVerified && matchesTrusted;
  });

  // Apply sorting
  const sortBy = document.getElementById("market-sort").value;
  filtered = sortListings(filtered, sortBy);

  renderMarketplace(filtered);
}

// 5. SORTING LOGIC
function initSort() {
  const sortSelect = document.getElementById("market-sort");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      applyAllFilters();
    });
  }
}

function sortListings(listings, criterion) {
  const listCopy = [...listings];
  if (criterion === "price-low") {
    return listCopy.sort((a, b) => a.price - b.price);
  } else if (criterion === "price-high") {
    return listCopy.sort((a, b) => b.price - a.price);
  } else if (criterion === "rating") {
    return listCopy.sort((a, b) => b.rating - a.rating);
  }
  return listCopy; // default
}

// 6. BOOKING AND LISTING MODAL LOGIC
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

  // Modal rent mode toggle listeners
  const modalBtnRentDaily = document.getElementById("modal-btn-rent-daily");
  const modalBtnRentHourly = document.getElementById("modal-btn-rent-hourly");
  const modalDailyInputs = document.getElementById("modal-booking-daily-inputs");
  const modalHourlyInputs = document.getElementById("modal-booking-hourly-inputs");

  if (modalBtnRentDaily && modalBtnRentHourly) {
    modalBtnRentDaily.addEventListener("click", () => {
      modalRentMode = "daily";
      modalBtnRentDaily.style.background = "var(--primary-dark)";
      modalBtnRentDaily.style.color = "white";
      modalBtnRentHourly.style.background = "transparent";
      modalBtnRentHourly.style.color = "var(--text-light)";
      if (modalDailyInputs) modalDailyInputs.style.display = "flex";
      if (modalHourlyInputs) modalHourlyInputs.style.display = "none";
      
      if (currentBookingListing) {
        document.getElementById("booking-asset-rate").textContent = `LKR ${currentBookingListing.price.toLocaleString()} / ${currentBookingListing.unit}`;
        updateBookingSummary(currentBookingListing);
      }
    });

    modalBtnRentHourly.addEventListener("click", () => {
      modalRentMode = "hourly";
      modalBtnRentHourly.style.background = "var(--primary-dark)";
      modalBtnRentHourly.style.color = "white";
      modalBtnRentDaily.style.background = "transparent";
      modalBtnRentDaily.style.color = "var(--text-light)";
      if (modalDailyInputs) modalDailyInputs.style.display = "none";
      if (modalHourlyInputs) modalHourlyInputs.style.display = "block";
      
      if (currentBookingListing) {
        const hrPrice = currentBookingListing.priceHourly || Math.round(currentBookingListing.price / 8);
        document.getElementById("booking-asset-rate").textContent = `LKR ${hrPrice.toLocaleString()} / hour`;
        updateBookingSummary(currentBookingListing);
      }
    });
  }

  // Bind change listeners to hourly inputs inside modal
  const modalRentDate = document.getElementById("booking-rent-date");
  const modalRentTime = document.getElementById("booking-rent-time");
  const modalRentHours = document.getElementById("booking-rent-hours");
  if (modalRentDate) {
    modalRentDate.value = new Date().toISOString().split("T")[0];
    modalRentDate.min = new Date().toISOString().split("T")[0];
    modalRentDate.addEventListener("change", () => {
      if (currentBookingListing) updateBookingSummary(currentBookingListing);
    });
  }
  if (modalRentTime) {
    modalRentTime.addEventListener("change", () => {
      if (currentBookingListing) updateBookingSummary(currentBookingListing);
    });
  }
  if (modalRentHours) {
    modalRentHours.addEventListener("input", () => {
      if (currentBookingListing) updateBookingSummary(currentBookingListing);
    });
    modalRentHours.addEventListener("change", () => {
      if (currentBookingListing) updateBookingSummary(currentBookingListing);
    });
  }

  // Open List Asset Modal
  const listAssetBtns = document.querySelectorAll(".list-asset-trigger");
  listAssetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const modal = document.getElementById("list-asset-modal");
      document.getElementById("listing-form-content").style.display = "block";
      document.getElementById("listing-success-content").style.display = "none";
      modal.querySelector(".modal-footer").style.display = "flex";
      modal.classList.add("active");
    });
  });

  // Booking Form submit
  const bookingForm = document.getElementById("modal-booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = bookingForm.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Confirming...`;
      
      setTimeout(() => {
        document.getElementById("booking-form-content").style.display = "none";
        document.getElementById("booking-success-content").style.display = "block";
        document.getElementById("booking-modal").querySelector(".modal-footer").style.display = "none";
        
        const refCode = "UTL-" + Math.floor(100000 + Math.random() * 900000);
        document.getElementById("booking-ref-code").innerHTML = `<strong>Reference ID:</strong> ${refCode}`;
        
        // Customize success screen paragraph based on selection
        const successIllustrationDiv = document.querySelector("#booking-success-content .success-illustration");
        if (successIllustrationDiv) {
          const pElements = successIllustrationDiv.querySelectorAll("p");
          if (pElements.length > 0) {
            if (modalRentMode === "hourly") {
              const dateVal = document.getElementById("booking-rent-date").value;
              const timeVal = document.getElementById("booking-rent-time").value;
              const hoursVal = document.getElementById("booking-rent-hours").value;
              pElements[0].textContent = `Your hourly request has been sent to the host. We have held the hourly slot on ${dateVal} at ${timeVal} for ${hoursVal} hours.`;
            } else {
              pElements[0].textContent = `Your request has been sent to the host. We have held the booking slot temporarily.`;
            }
          }
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        bookingForm.reset();
      }, 1800);
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
      const minDelay = new Promise(resolve => setTimeout(resolve, 1800));

      Promise.all([imagesReady, minDelay]).then(([images]) => {
        publishListing({ title, category, location, price, unit, description }, images);
        renderMarketplace(listingsDatabase);
        
        document.getElementById("listing-form-content").style.display = "none";
        document.getElementById("listing-success-content").style.display = "block";
        document.getElementById("list-asset-modal").querySelector(".modal-footer").style.display = "none";
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        listingForm.reset();
      });
    });
  }

  // Cost recalculation in booking modal
  const durationInput = document.getElementById("booking-duration");
  if (durationInput) {
    durationInput.addEventListener("input", () => {
      if (currentBookingListing) {
        updateBookingSummary(currentBookingListing);
      }
    });
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.classList.remove("active");
  });
}

function openBookingModal(listingId) {
  const listing = listingsDatabase.find(item => item.id === listingId);
  if (!listing) return;
  
  currentBookingListing = listing;
  modalRentMode = "daily";
  
  const modal = document.getElementById("booking-modal");
  const titleSpan = document.getElementById("booking-asset-title");
  const rateSpan = document.getElementById("booking-asset-rate");
  const durationLabel = document.getElementById("booking-duration-label");
  const durationInput = document.getElementById("booking-duration");

  const modalBtnRentDaily = document.getElementById("modal-btn-rent-daily");
  const modalBtnRentHourly = document.getElementById("modal-btn-rent-hourly");
  const modalDailyInputs = document.getElementById("modal-booking-daily-inputs");
  const modalHourlyInputs = document.getElementById("modal-booking-hourly-inputs");

  if (modalBtnRentDaily && modalBtnRentHourly) {
    modalBtnRentDaily.style.background = "var(--primary-dark)";
    modalBtnRentDaily.style.color = "white";
    modalBtnRentHourly.style.background = "transparent";
    modalBtnRentHourly.style.color = "var(--text-light)";
    if (modalDailyInputs) modalDailyInputs.style.display = "flex";
    if (modalHourlyInputs) modalHourlyInputs.style.display = "none";
  }
  
  titleSpan.textContent = listing.title;
  rateSpan.textContent = `LKR ${listing.price.toLocaleString()} / ${listing.unit}`;
  durationLabel.textContent = `Number of ${capitalizeFirstLetter(listing.unit)}s`;
  durationInput.value = 1;
  
  updateBookingSummary(listing);
  
  document.getElementById("booking-form-content").style.display = "block";
  document.getElementById("booking-success-content").style.display = "none";
  modal.querySelector(".modal-footer").style.display = "flex";
  
  modal.classList.add("active");
}

function updateBookingSummary(listing) {
  let baseCost = 0;
  let deposit = 0;
  
  if (modalRentMode === "daily") {
    const duration = parseInt(document.getElementById("booking-duration").value) || 1;
    baseCost = listing.price * duration;
    deposit = Math.round(listing.price * 0.5);
    document.getElementById("summary-base-rate").innerHTML = `LKR ${listing.price.toLocaleString()} &times; ${duration} ${listing.unit}(s)`;
  } else {
    const hours = parseInt(document.getElementById("booking-rent-hours").value) || 1;
    const hrPrice = listing.priceHourly || Math.round(listing.price / 8);
    baseCost = hrPrice * hours;
    deposit = Math.round(hrPrice * hours * 0.5);
    document.getElementById("summary-base-rate").innerHTML = `LKR ${hrPrice.toLocaleString()} &times; ${hours} hour(s)`;
  }
  
  const platformFee = Math.round(baseCost * 0.05);
  const grandTotal = baseCost + platformFee + deposit;
  
  document.getElementById("summary-base-total").textContent = `LKR ${baseCost.toLocaleString()}`;
  document.getElementById("summary-platform-fee").textContent = `LKR ${platformFee.toLocaleString()}`;
  document.getElementById("summary-deposit").textContent = `LKR ${deposit.toLocaleString()}`;
  document.getElementById("summary-grand-total").textContent = `LKR ${grandTotal.toLocaleString()}`;
}

// Add dynamic rotation styles on list published (spinner rotation)
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
