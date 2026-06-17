document.addEventListener("DOMContentLoaded", () => {
  initImageUpload();
});

function initImageUpload() {
  const listingForm = document.getElementById("modal-listing-form");
  if (!listingForm) return;

  const dropzone = document.getElementById("listing-dropzone");
  const fileInput = document.getElementById("listing-file-input");
  const uploadBtn = document.getElementById("listing-upload-btn");
  const previewGrid = document.getElementById("listing-preview-grid");

  if (!dropzone || !fileInput || !previewGrid) return;

  let selectedFiles = [];

  // Trigger file input click
  const triggerFileInput = (e) => {
    if (e.target === fileInput) return;
    fileInput.click();
  };

  dropzone.addEventListener("click", triggerFileInput);
  if (uploadBtn) {
    uploadBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent duplicate click events
      fileInput.click();
    });
  }

  // Handle Drag & Drop events
  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("dragover");
    }, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("dragover");
    }, false);
  });

  dropzone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  fileInput.addEventListener("change", () => {
    handleFiles(fileInput.files);
  });

  function handleFiles(files) {
    // Validate image format (PNG, JPG/JPEG) and size limit (5MB)
    const validFiles = Array.from(files).filter((file) => {
      const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
      const isUnder5MB = file.size <= 5 * 1024 * 1024;
      
      if (!isImage) {
        alert(`File "${file.name}" is not a supported format. Please use PNG, JPG or JPEG.`);
      } else if (!isUnder5MB) {
        alert(`File "${file.name}" exceeds the 5MB size limit.`);
      }
      
      return isImage && isUnder5MB;
    });

    if (selectedFiles.length + validFiles.length > 3) {
      alert("You can upload a maximum of 3 images.");
    }

    // Append files to available slots
    const slotsLeft = 3 - selectedFiles.length;
    selectedFiles = [...selectedFiles, ...validFiles.slice(0, slotsLeft)];

    // Reset error styling on successful upload
    dropzone.style.borderColor = "";
    dropzone.style.backgroundColor = "";

    updatePreviews();
  }

  function updatePreviews() {
    const placeholders = previewGrid.querySelectorAll(".preview-placeholder");
    
    placeholders.forEach((placeholder, index) => {
      if (selectedFiles[index]) {
        const file = selectedFiles[index];
        const objectUrl = URL.createObjectURL(file);
        
        placeholder.innerHTML = `
          <img class="preview-image" src="${objectUrl}" alt="Preview image ${index + 1}">
          <span class="remove-image-btn" data-index="${index}">&times;</span>
        `;
        placeholder.classList.remove("active");
      } else {
        // Restore empty/required placeholders
        if (index === 0 && selectedFiles.length === 0) {
          placeholder.innerHTML = `<span class="placeholder-text">Required</span>`;
          placeholder.classList.add("active");
        } else {
          placeholder.innerHTML = ``;
          placeholder.classList.remove("active");
        }
      }
    });

    // Rebind remove click events
    const removeBtns = previewGrid.querySelectorAll(".remove-image-btn");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute("data-index"));
        selectedFiles.splice(index, 1);
        updatePreviews();
      });
    });
  }

  // Intercept form submission for client-side required image validation
  listingForm.addEventListener("submit", (e) => {
    if (selectedFiles.length === 0) {
      e.preventDefault();
      e.stopPropagation();

      // Highlight dropzone with error styling
      dropzone.style.borderColor = "#EF4444";
      dropzone.style.backgroundColor = "rgba(239, 68, 68, 0.05)";
      
      dropzone.scrollIntoView({ behavior: "smooth", block: "center" });
      alert("At least one image is required to publish a listing!");
      return false;
    }
  });

  // Handle resets (form reset and modal closures)
  const resetUpload = () => {
    selectedFiles = [];
    fileInput.value = "";
    dropzone.style.borderColor = "";
    dropzone.style.backgroundColor = "";
    updatePreviews();
  };

  listingForm.addEventListener("reset", resetUpload);

  document.querySelectorAll(".modal-close, .modal-overlay").forEach((el) => {
    el.addEventListener("click", () => {
      setTimeout(resetUpload, 300); // Allow modal animation to complete
    });
  });
}
