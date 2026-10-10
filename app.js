// Active wishlist state tracker (stores listing IDs)
let wishlist = new Set();

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initSearch();
  initCategoryFilters();
  initListingRenderer(listingsDatabase);
  initHowItWorks();
  initTestimonialSlider();
  initModals();
});

// 1. NAVBAR SCROLL EFFECT
function initNavbar() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// 2. MOBILE MENU DRAWER
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector(".header");
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("active");
      header.classList.toggle("menu-open", isOpen);
      
      // Update hamburger icon
      menuToggle.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== menuToggle) {
        mobileMenu.classList.remove("active");
        header.classList.remove("menu-open");
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      }
    });

    // Close mobile menu when clicking any link
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        header.classList.remove("menu-open");
        menuToggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
      });
    });
  }
}

// 3. SEARCH FUNCTIONALITY
function initSearch() {
  const searchForm = document.getElementById("hero-search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const keyword = document.getElementById("search-keyword").value.toLowerCase().trim();
      const location = document.getElementById("search-location").value;
      const category = document.getElementById("search-category").value;
      
      // Filter database
      const filtered = listingsDatabase.filter(item => {
        const matchesKeyword = !keyword || 
          item.title.toLowerCase().includes(keyword) || 
          item.description.toLowerCase().includes(keyword);
          
        const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());
        const matchesCategory = !category || item.category === category;
        
        return matchesKeyword && matchesLocation && matchesCategory;
      });
      
      // Update visual category filters to matching category, or clear if all
      const catCards = document.querySelectorAll(".category-card");
      catCards.forEach(card => card.classList.remove("active"));
      if (category) {
        const activeCard = document.querySelector(`.category-card[data-category="${category}"]`);
        if (activeCard) activeCard.classList.add("active");
      }
      
      const filterTabs = document.querySelectorAll(".filter-tab");
      filterTabs.forEach(tab => tab.classList.remove("active"));
      const targetVal = category || "all";
      const activeTab = document.querySelector(`.filter-tab[data-filter="${targetVal}"]`);
      if (activeTab) activeTab.classList.add("active");
      
      // Render listing outcomes
      initListingRenderer(filtered);
      
      // Scroll smoothly to listings section
      const listingsSection = document.getElementById("listings-section");
      if (listingsSection) {
        listingsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// 4. CATEGORY CARD FILTERS
function initCategoryFilters() {
  const categoryCards = document.querySelectorAll(".category-card");
  const filterTabs = document.querySelectorAll(".filter-tab");
  
  // Category cards on Hero page
  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const selectedCategory = card.getAttribute("data-category");
      
      // Toggle card styles
      categoryCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      
      // Sync with filter tabs
      filterTabs.forEach(tab => tab.classList.remove("active"));
      const syncTab = document.querySelector(`.filter-tab[data-filter="${selectedCategory}"]`);
      if (syncTab) syncTab.classList.add("active");
      
      // Filter & Render
      const filtered = selectedCategory === "all" 
        ? listingsDatabase 
        : listingsDatabase.filter(item => item.category === selectedCategory);
        
      initListingRenderer(filtered);
      
      // Scroll to list
      document.getElementById("listings-section").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Filter tabs in Listings Section
  filterTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const filterValue = tab.getAttribute("data-filter");
      
      filterTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      // Sync with Category Cards
      categoryCards.forEach(c => c.classList.remove("active"));
      const syncCard = document.querySelector(`.category-card[data-category="${filterValue}"]`);
      if (syncCard) syncCard.classList.add("active");
      
      // Filter & Render
      const filtered = filterValue === "all" 
        ? listingsDatabase 
        : listingsDatabase.filter(item => item.category === filterValue);
        
      initListingRenderer(filtered);
    });
  });
}

// 5. RENDER LISTINGS
function initListingRenderer(listings) {
  const container = document.getElementById("listings-container");
  if (!container) return;
  
  if (listings.length === 0) {
    container.innerHTML = `
      <div class="no-listings-found">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3>No Listings Found</h3>
        <p>Try broadening your search keywords, or selecting a different location / category.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = listings.map(item => {
    // Generate icons for specs depending on category
    let specHtml = "";
    Object.entries(item.specs).forEach(([key, val], index) => {
      if (index < 2) { // Limit to 2 specs in card view
        specHtml += `
          <div class="listing-spec-item">
            <span><strong>${capitalizeFirstLetter(key)}:</strong> ${val}</span>
          </div>
        `;
      }
    });

    const isFav = wishlist.has(item.id) ? "active" : "";
    const heartFill = wishlist.has(item.id) ? "currentColor" : "none";
    
    return `
      <div class="listing-card" data-id="${item.id}">
        <div class="listing-image-container">
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
            <span class="listing-location">
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
              ${item.rating} <span style="font-size:0.75rem; color:var(--text-light); font-weight:400;">(${item.reviews})</span>
            </span>
          </div>
          
          <a href="details.html?id=${item.id}" style="color: inherit; text-decoration: none;">
            <h3 class="listing-title">${item.title}</h3>
          </a>
          
          <div class="listing-specs">
            ${specHtml}
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

  // Re-attach event listeners to wishlist and booking buttons
  attachListingEvents();
}

function attachListingEvents() {
  // Wishlist toggle
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

  // Booking buttons
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

// 6. HOW IT WORKS TAB SWITCHING
function initHowItWorks() {
  const tabs = document.querySelectorAll(".toggle-tab");
  const contents = document.querySelectorAll(".stepper-content");
  
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      
      contents.forEach(c => {
        if (c.getAttribute("id") === `${target}-steps`) {
          c.classList.add("active");
        } else {
          c.classList.remove("active");
        }
      });
    });
  });
}

// 7. TESTIMONIAL SLIDER
function initTestimonialSlider() {
  const track = document.querySelector(".testimonials-track");
  const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  const dotsContainer = document.querySelector(".slider-dots");
  
  if (!track || slides.length === 0) return;
  
  let currentIndex = 0;
  let autoPlayTimer;

  // Create dot indicators
  dotsContainer.innerHTML = slides.map((_, i) => `
    <div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
  `).join("");
  
  const dots = Array.from(dotsContainer.querySelectorAll(".slider-dot"));

  function updateSlider(index) {
    currentIndex = index;
    // Bounds check
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    
    // Shift track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    // Update dots
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Event handlers
  prevBtn.addEventListener("click", () => {
    resetAutoplay();
    updateSlider(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    resetAutoplay();
    updateSlider(currentIndex + 1);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      resetAutoplay();
      const index = parseInt(dot.getAttribute("data-index"));
      updateSlider(index);
    });
  });

  // Autoplay
  function startAutoplay() {
    autoPlayTimer = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoPlayTimer);
    startAutoplay();
  }

  startAutoplay();
}

// 8. MODAL INTERACTIVE LOGIC (BOOKING & LISTING)
let currentBookingListing = null;
let modalRentMode = "daily";

function initModals() {
  const modalOverlays = document.querySelectorAll(".modal-overlay");
  const closeBtns = document.querySelectorAll(".modal-close");
  
  // Close buttons
  closeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      closeAllModals();
    });
  });

  // Click on backdrop to close
  modalOverlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeAllModals();
      }
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

  // Listing modal trigger
  const listAssetBtns = document.querySelectorAll(".list-asset-trigger");
  listAssetBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openListAssetModal();
    });
  });

  // Mock form submissions
  const bookingForm = document.getElementById("modal-booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitBooking();
    });
  }

  const listingForm = document.getElementById("modal-listing-form");
  if (listingForm) {
    listingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitNewListing();
    });
  }

  // Update booking cost dynamically on dates input
  const bookingDaysInput = document.getElementById("booking-duration");
  if (bookingDaysInput) {
    bookingDaysInput.addEventListener("input", () => {
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
  durationInput.value = 1; // Default
  
  // Setup summary billing cost
  updateBookingSummary(listing);
  
  // Reset form status content
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
  
  const platformFee = Math.round(baseCost * 0.05); // 5% fee
  const grandTotal = baseCost + platformFee + deposit;
  
  document.getElementById("summary-base-total").textContent = `LKR ${baseCost.toLocaleString()}`;
  document.getElementById("summary-platform-fee").textContent = `LKR ${platformFee.toLocaleString()}`;
  document.getElementById("summary-deposit").textContent = `LKR ${deposit.toLocaleString()}`;
  document.getElementById("summary-grand-total").textContent = `LKR ${grandTotal.toLocaleString()}`;
}

function submitBooking() {
  const form = document.getElementById("modal-booking-form");
  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.innerHTML;
  
  // Disable button, show loading
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Verifying...`;
  
  // Simulate API delay
  setTimeout(() => {
    // Show success content
    document.getElementById("booking-form-content").style.display = "none";
    document.getElementById("booking-success-content").style.display = "block";
    document.getElementById("booking-modal").querySelector(".modal-footer").style.display = "none";
    
    // Generate mock reference code
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

    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();
  }, 1800);
}

function openListAssetModal() {
  const modal = document.getElementById("list-asset-modal");
  
  // Reset visibility state
  document.getElementById("listing-form-content").style.display = "block";
  document.getElementById("listing-success-content").style.display = "none";
  modal.querySelector(".modal-footer").style.display = "flex";
  
  modal.classList.add("active");
}

function submitNewListing() {
  const form = document.getElementById("modal-listing-form");
  const submitBtn = form.querySelector("button[type='submit']");
  const originalText = submitBtn.innerHTML;
  
  // Fetch form values
  const title = document.getElementById("listing-title-input").value;
  const category = document.getElementById("listing-category-select").value;
  const location = document.getElementById("listing-location-select").value;
  const price = parseInt(document.getElementById("listing-price-input").value);
  const unit = document.getElementById("listing-unit-select").value;
  const description = document.getElementById("listing-desc-input").value;
  
  // Show uploading spinner
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite; margin-right: 8px;"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg> Publishing...`;
  
  setTimeout(() => {
    // Select placeholder image based on category
    let image = "assets/Commercial Cloud Kitchen Space.jpeg";
    if (category === "vehicles") image = "assets/Suzuki Every Mini Van (Dual AC).jpg";
    else if (category === "equipment") image = "assets/35 kVA Soundproof Diesel Generator.jpeg";
    else if (category === "storage") image = "assets/Secure Dry Storage Room (15x20 ft).jpeg";
    else if (category === "parking") image = "assets/Gated Commercial Parking Space.jpg";

    const newId = listingsDatabase.length + 1;
    const newListing = {
      id: newId,
      title: title,
      category: category,
      location: location,
      price: price,
      unit: unit,
      rating: 5.0,
      reviews: 0,
      specs: { size: "Standard size", availability: "Immediate" },
      image: image,
      description: description
    };
    
    // Insert into db array at beginning so it shows in preview
    listingsDatabase.unshift(newListing);
    
    // Refresh listing elements on dashboard
    initListingRenderer(listingsDatabase);
    
    // Transition modal success state
    document.getElementById("listing-form-content").style.display = "none";
    document.getElementById("listing-success-content").style.display = "block";
    document.getElementById("list-asset-modal").querySelector(".modal-footer").style.display = "none";
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;
    form.reset();
  }, 1800);
}

// Spin CSS keyframes (handled in JS since it's a dynamic spinner icon)
const style = document.createElement('style');
style.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
