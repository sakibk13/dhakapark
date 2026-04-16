const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
  });
}

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  reveals.forEach((element) => {
    const boxTop = element.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Homepage Map Search Functionality
const mapSearchInput = document.getElementById("mapSearchInput");
const mapSearchBtn = document.getElementById("mapSearchBtn");
const mapMarkers = document.querySelectorAll(".map-marker");

if (mapSearchBtn && mapSearchInput) {
  mapSearchBtn.addEventListener("click", () => {
    const query = mapSearchInput.value.toLowerCase().trim();
    if (!query) return;

    // Scroll to map
    const mapSection = document.getElementById("map");
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: "smooth" });
    }

    let found = false;
    mapMarkers.forEach((marker) => {
      const labelText = marker.querySelector(".map-label").innerText.toLowerCase();
      if (labelText.includes(query)) {
        marker.classList.remove("hidden");
        marker.classList.add("highlight");
        found = true;
      } else {
        marker.classList.remove("highlight");
        // Don't hide others, just remove highlight for better UX in prototype
      }
    });

    if (!found) {
      alert("No parking site found for: " + query + ". Try searching for Gulshan, Banani, Dhanmondi, or Uttara.");
      mapMarkers.forEach(m => m.classList.remove("hidden", "highlight"));
    }
  });

  mapSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      mapSearchBtn.click();
    }
  });

  // Popular Tags Quick Search
  const popularTags = document.querySelectorAll(".popular-tags span");
  popularTags.forEach(tag => {
    tag.style.cursor = "pointer";
    tag.addEventListener("click", () => {
      mapSearchInput.value = tag.innerText;
      mapSearchBtn.click();
    });
  });
}

// Locations Page Instant Filter Functionality
const locationFilter = document.getElementById("locationFilter");
const parkingCards = document.querySelectorAll(".parking-card");
const locMapMarkers = document.querySelectorAll(".locations-layout .map-marker");

if (locationFilter) {
  locationFilter.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    // Filter the cards in the sidebar
    parkingCards.forEach(card => {
      const area = card.getAttribute("data-area") || "";
      const title = card.querySelector("h3").innerText.toLowerCase();
      if (area.includes(query) || title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    // Filter the markers on the map
    locMapMarkers.forEach(marker => {
      const label = marker.querySelector(".map-label").innerText.toLowerCase();
      if (label.includes(query)) {
        marker.style.opacity = "1";
        marker.style.transform = "scale(1)";
      } else {
        marker.style.opacity = "0.2";
        marker.style.transform = "scale(0.8)";
      }
    });
  });
}

// Subscription Tab Switching
const tabBtns = document.querySelectorAll(".toggle-btn");
const individualTab = document.getElementById("individualTab");
const corporateTab = document.getElementById("corporateTab");

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all buttons
      tabBtns.forEach(b => b.classList.remove("active"));
      // Add active to clicked button
      btn.classList.add("active");

      const tabType = btn.getAttribute("data-tab");
      if (tabType === "individual") {
        individualTab.classList.add("active");
        corporateTab.classList.remove("active");
      } else {
        corporateTab.classList.add("active");
        individualTab.classList.remove("active");
      }
    });
  });
}

// Receipt Filtering Logic
const receiptTypeFilter = document.getElementById("receiptTypeFilter");
const receiptCards = document.querySelectorAll(".receipt-card");

if (receiptTypeFilter) {
  receiptTypeFilter.addEventListener("change", (e) => {
    const selectedType = e.target.value;
    
    receiptCards.forEach(card => {
      const cardType = card.getAttribute("data-type");
      if (selectedType === "all" || cardType === selectedType) {
        card.style.display = "block";
        // Re-trigger reveal animation if needed, or just ensure it's visible
        card.classList.add("active"); 
      } else {
        card.style.display = "none";
      }
    });
  });
}

// Support Search Mock
const supportSearchBtn = document.querySelector(".support-search .search-btn");
const supportSearchInput = document.querySelector(".support-search input");

if (supportSearchBtn && supportSearchInput) {
  supportSearchBtn.addEventListener("click", () => {
    const query = supportSearchInput.value.trim();
    if (query) {
      alert("Searching for: " + query + "\n\nThis is a demo. In the real app, this would search our knowledge base.");
    } else {
      alert("Please enter a search term.");
    }
  });

  supportSearchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      supportSearchBtn.click();
    }
  });
}

// Dummy Login Logic
const loginForm = document.querySelector(".auth-form");
if (loginForm && window.location.pathname.includes("login.html")) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    if (email === "user@gmail.com" && password === "1234") {
      alert("Login Successful! Redirecting to Management Dashboard...");
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials. Please use:\nEmail: user@gmail.com\nPass: 1234");
    }
  });
}
