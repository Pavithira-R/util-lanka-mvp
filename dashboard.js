// ============================================================================
// DEMO MOCK NOTE: 
// In a clean production app, this client-side state is insecure.
// User authentication (JWT/cookies) must be verified, and host data must be
// fetched dynamically from a secure database via backend APIs
// (e.g. GET /api/host/listings) to enforce strict object-level access controls (BOLA).
// ============================================================================

// Load dataset from LocalStorage or seed with defaults
let hostListings = JSON.parse(localStorage.getItem("hostListings")) || DEFAULT_HOST_LISTINGS;
let bookingRequests = JSON.parse(localStorage.getItem("bookingRequests")) || DEFAULT_BOOKING_REQUESTS;
let completedBookings = JSON.parse(localStorage.getItem("completedBookings")) || DEFAULT_COMPLETED_BOOKINGS;
let stats = JSON.parse(localStorage.getItem("dashboardStats")) || DEFAULT_STATS;
let notifications = JSON.parse(localStorage.getItem("dashboardNotifications")) || DEFAULT_NOTIFICATIONS;

// Sync localStorage immediately so values persist properly
if (!localStorage.getItem("hostListings")) localStorage.setItem("hostListings", JSON.stringify(hostListings));
if (!localStorage.getItem("bookingRequests")) localStorage.setItem("bookingRequests", JSON.stringify(bookingRequests));
if (!localStorage.getItem("completedBookings")) localStorage.setItem("completedBookings", JSON.stringify(completedBookings));
if (!localStorage.getItem("dashboardStats")) localStorage.setItem("dashboardStats", JSON.stringify(stats));
if (!localStorage.getItem("dashboardNotifications")) localStorage.setItem("dashboardNotifications", JSON.stringify(notifications));

// Listings published from the home, marketplace or details pages belong to this host too
syncPublishedListings();

function syncPublishedListings() {
  const missing = loadUserListings().filter(listing => !hostListings.some(item => item.id === listing.id));
  if (missing.length === 0) return;

  // loadUserListings() is newest first; add oldest first so the newest ends up on top
  missing.reverse().forEach(listing => {
    hostListings.unshift({
      id: listing.id,
      title: listing.title,
      category: listing.category,
      location: listing.location,
      price: listing.price,
      unit: listing.unit,
      status: "Active",
      earnings: 0,
      rating: listing.rating,
      reviews: listing.reviews,
      image: listing.image
    });
    stats.totalListings += 1;
    notifications.unshift({ time: "Just now", text: `Published new listing: ${listing.title}` });
  });

  localStorage.setItem("hostListings", JSON.stringify(hostListings));
  localStorage.setItem("dashboardStats", JSON.stringify(stats));
  localStorage.setItem("dashboardNotifications", JSON.stringify(notifications));
}

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  renderStats();
  renderListings();
  renderRequests();
  renderEarnings();
  renderNotifications();
  initPeakSeasonToggle();
  initModals();
  initResetDemo();
});

// Clears everything saved during a demo run and reloads with the seed data
function initResetDemo() {
  const resetBtn = document.getElementById("btn-reset-demo");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset the demo? This removes listings and booking requests made in this browser.")) return;
    resetDemoData();
    window.location.reload();
  });
}

// 1. MOBILE MENU DRAWER
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

// 2. RENDER OVERVIEW STATS
function renderStats() {
  document.getElementById("stat-total-listings").textContent = stats.totalListings;
  document.getElementById("stat-active-bookings").textContent = stats.activeBookings;
  document.getElementById("stat-monthly-earnings").textContent = `LKR ${stats.monthlyEarnings.toLocaleString()}`;
  document.getElementById("stat-pending-requests").textContent = stats.pendingRequests;
}

// 3. RENDER MY LISTINGS
function renderListings() {
  const container = document.getElementById("listings-grid-container");
  if (!container) return;

  container.innerHTML = hostListings.map(item => {
    const isPaused = item.status === "Paused";
    const statusClass = isPaused ? "badge-paused" : "badge-active";
    const actionBtnText = isPaused ? "Mark Available" : "Pause Listing";
    const actionBtnClass = isPaused ? "btn-outline" : "btn-secondary";
    
    return `
      <div class="dashboard-listing-card">
        <div class="card-img-wrapper">
          <img src="${item.image}" alt="${item.title}" class="listing-thumb">
          <span class="status-badge ${statusClass}">${item.status}</span>
        </div>
        <div class="card-details">
          <h4 class="listing-card-title">${item.title}</h4>
          <p class="listing-card-address">${item.location}</p>
          <div class="listing-card-meta">
            <span>Rate: <strong>LKR ${item.price.toLocaleString()} / ${item.unit}</strong></span>
            <span>Earnings: <strong>LKR ${item.earnings.toLocaleString()}</strong></span>
          </div>
          <div class="listing-card-actions">
            <button class="btn btn-sm ${actionBtnClass}" onclick="toggleListingStatus(${item.id})">${actionBtnText}</button>
            <button class="btn btn-sm btn-outline" onclick="mockEditListing(${item.id})">Edit</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// TOGGLE LISTING STATUS
window.toggleListingStatus = function(id) {
  const item = hostListings.find(l => l.id === id);
  if (!item) return;

  if (item.status === "Active") {
    item.status = "Paused";
    addNotification("Just now", `Paused listing: ${item.title}`);
  } else {
    item.status = "Active";
    addNotification("Just now", `Activated listing: ${item.title}`);
  }
  localStorage.setItem("hostListings", JSON.stringify(hostListings));
  renderListings();
  renderNotifications();
};

window.mockEditListing = function(id) {
  const item = hostListings.find(l => l.id === id);
  if (item) {
    alert(`Edit Listing Modal details for: "${item.title}" (Mock Simulation)`);
  }
};

// 4. RENDER BOOKING REQUESTS
function renderRequests() {
  const container = document.getElementById("requests-list-container");
  if (!container) return;

  if (bookingRequests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-light); font-size: 0.9rem;">
        No pending booking requests.
      </div>
    `;
    return;
  }

  container.innerHTML = bookingRequests.map(req => {
    const unitName = req.rentMode === "hourly" ? "hour(s)" : "day(s)";
    return `
      <div class="request-item" id="request-item-${req.id}">
        <div class="request-item-details">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; flex-wrap: wrap;">
            <span class="request-renter-avatar">${req.renter.charAt(0)}</span>
            <strong class="request-renter-name">${req.renter}</strong>
            <span class="badge badge-teal" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">Pending Approval</span>
            <span class="badge" style="font-size: 0.65rem; padding: 0.1rem 0.4rem; background-color: rgba(20, 184, 166, 0.08); color: var(--accent-teal); font-weight: 700; border: 1px solid rgba(20, 184, 166, 0.2);">${req.renterNic ? `NIC Verified: ${req.renterNic}` : "NIC check pending"}</span>
          </div>
          <p class="request-asset-title">${req.assetTitle}</p>
          <p class="request-dates-range">${req.dates} (${req.duration} ${unitName})</p>
          <p class="request-total-price">Requested Rent Value: <strong>LKR ${req.price.toLocaleString()}</strong></p>
        </div>
        <div class="request-item-actions">
          <button class="btn btn-sm btn-primary" onclick="approveRequest(${req.id})">Approve</button>
          <button class="btn btn-sm btn-outline" style="color: #EF4444; border-color: #FCA5A5;" onclick="declineRequest(${req.id})">Decline</button>
        </div>
      </div>
    `;
  }).join("");
}

// APPROVE REQUEST
window.approveRequest = function(id) {
  const req = bookingRequests.find(r => r.id === id);
  if (!req) return;

  // Update Stats
  stats.monthlyEarnings += req.price;
  stats.activeBookings += 1;
  stats.pendingRequests = Math.max(0, stats.pendingRequests - 1);

  // Add notification
  addNotification("Just now", `Approved booking request from ${req.renter} for ${req.assetTitle}`);
  
  // Add to completed log or active bookings list
  completedBookings.unshift({
    id: req.id,
    assetTitle: req.assetTitle,
    renter: req.renter,
    dates: req.rentMode === "hourly" ? `${req.dates} (${req.duration} hours)` : req.dates,
    amount: req.price,
    status: "Confirmed"
  });

  // Remove from requests list
  bookingRequests = bookingRequests.filter(r => r.id !== id);

  // Save changes to localStorage
  localStorage.setItem("bookingRequests", JSON.stringify(bookingRequests));
  localStorage.setItem("completedBookings", JSON.stringify(completedBookings));
  localStorage.setItem("dashboardStats", JSON.stringify(stats));

  renderStats();
  renderRequests();
  renderEarnings();
  renderNotifications();
};

// DECLINE REQUEST
window.declineRequest = function(id) {
  const req = bookingRequests.find(r => r.id === id);
  if (!req) return;

  // Update Stats
  stats.pendingRequests = Math.max(0, stats.pendingRequests - 1);

  // Add notification
  addNotification("Just now", `Declined booking request from ${req.renter} for ${req.assetTitle}`);

  // Remove from requests list
  bookingRequests = bookingRequests.filter(r => r.id !== id);

  // Save changes to localStorage
  localStorage.setItem("bookingRequests", JSON.stringify(bookingRequests));
  localStorage.setItem("dashboardStats", JSON.stringify(stats));

  renderStats();
  renderRequests();
  renderNotifications();
};

// 5. RENDER RECENT EARNINGS SUMMARY
function renderEarnings() {
  const tbody = document.getElementById("earnings-tbody");
  if (!tbody) return;

  tbody.innerHTML = completedBookings.map(row => {
    let statusClass = "badge-paid";
    if (row.status === "Confirmed") statusClass = "badge-confirmed";
    
    return `
      <tr>
        <td><strong>${row.assetTitle}</strong></td>
        <td>${row.renter}</td>
        <td>${row.dates}</td>
        <td><strong>LKR ${row.amount.toLocaleString()}</strong></td>
        <td><span class="status-tag ${statusClass}">${row.status}</span></td>
      </tr>
    `;
  }).join("");
}

// 6. RENDER NOTIFICATIONS
function renderNotifications() {
  const container = document.getElementById("notifications-container");
  if (!container) return;

  container.innerHTML = notifications.map(n => {
    return `
      <div class="notification-item">
        <span class="notification-time">${n.time}</span>
        <p class="notification-text">${n.text}</p>
      </div>
    `;
  }).join("");
}

function addNotification(time, text) {
  notifications.unshift({ time: time, text: text });
  localStorage.setItem("dashboardNotifications", JSON.stringify(notifications));
}

// 7. PEAK SEASON TOGGLE LOGIC
function initPeakSeasonToggle() {
  const toggleBtn = document.getElementById("btn-toggle-peak-season");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isPeak = toggleBtn.classList.toggle("active");
      if (isPeak) {
        toggleBtn.textContent = "Peak Mode Active (Listings Paused)";
        toggleBtn.style.backgroundColor = "#EF4444";
        toggleBtn.style.color = "white";
        // Pause all active listings
        hostListings.forEach(item => {
          if (item.status === "Active") {
            item.status = "Paused";
          }
        });
        addNotification("Just now", "Peak season emergency pause activated for Nallur festival week");
      } else {
        toggleBtn.textContent = "Activate Nallur Festival Pause";
        toggleBtn.style.backgroundColor = "var(--accent-teal-light)";
        toggleBtn.style.color = "var(--accent-teal)";
        // Restore status
        hostListings[0].status = "Active";
        hostListings[1].status = "Active";
        hostListings[2].status = "Active";
        addNotification("Just now", "Peak season emergency pause deactivated. Listings restored");
      }
      renderListings();
      renderNotifications();
    });
  }
}

// 8. LIST ASSET MODAL PREVIEW
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
        // Publish to the shared marketplace so the listing appears on every page
        const listing = publishListing({ title, category, location, price, unit, description }, images);

        const newListing = {
          id: listing.id,
          title: title,
          category: category,
          location: location,
          price: price,
          unit: unit,
          status: "Active",
          earnings: 0,
          rating: 5.0,
          reviews: 0,
          image: listing.image
        };

        hostListings.unshift(newListing);
        stats.totalListings += 1;
        
        localStorage.setItem("hostListings", JSON.stringify(hostListings));
        localStorage.setItem("dashboardStats", JSON.stringify(stats));
        
        addNotification("Just now", `Published new listing: ${title}`);
        
        renderStats();
        renderListings();
        renderNotifications();
        
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
