/* ========================================
   ImpactGuru Clone – script.js
   ======================================== */

// ========= DATA =========
const campaigns = [
  {
    id: 1,
    title: "Help Rohan Beat Leukemia",
    desc: "6-year-old Rohan needs urgent bone marrow transplant. His family has exhausted all savings fighting cancer for 2 years.",
    category: "medical",
    categoryLabel: "Medical",
    raised: 1450000,
    goal: 2000000,
    donors: 1240,
    urgent: true,
    img: "https://picsum.photos/seed/rohan1/600/400"
  },
  {
    id: 2,
    title: "School Books for 200 Tribal Children",
    desc: "Children in remote Odisha villages walk miles to school yet lack basic textbooks. Help us change that this academic year.",
    category: "education",
    categoryLabel: "Education",
    raised: 340000,
    goal: 400000,
    donors: 863,
    urgent: false,
    img: "https://picsum.photos/seed/tribal2/600/400"
  },
  {
    id: 3,
    title: "Assam Flood Victims – Emergency Aid",
    desc: "Over 50,000 families displaced by catastrophic flooding. Provide food kits, clean water, and shelter materials immediately.",
    category: "disaster",
    categoryLabel: "Disaster Relief",
    raised: 2800000,
    goal: 5000000,
    donors: 8921,
    urgent: true,
    img: "https://picsum.photos/seed/flood3/600/400"
  },
  {
    id: 4,
    title: "Rescue and Rehab 100 Street Dogs",
    desc: "Mumbai's Paws & Love Foundation is rescuing injured strays. Funds go to surgery, vaccination, and long-term shelter care.",
    category: "animals",
    categoryLabel: "Animal Welfare",
    raised: 210000,
    goal: 350000,
    donors: 540,
    urgent: false,
    img: "https://picsum.photos/seed/dogs4/600/400"
  },
  {
    id: 5,
    title: "Heart Surgery for Baby Mira",
    desc: "4-month-old Mira has a congenital heart defect. Her parents, daily wage workers, cannot afford the ₹5 lakh surgery.",
    category: "medical",
    categoryLabel: "Medical",
    raised: 320000,
    goal: 500000,
    donors: 412,
    urgent: true,
    img: "https://picsum.photos/seed/mira5/600/400"
  },
  {
    id: 6,
    title: "Digital Skills for Rural Women",
    desc: "Empowering 300 women in Rajasthan with computer literacy and digital business skills to achieve financial independence.",
    category: "education",
    categoryLabel: "Education",
    raised: 185000,
    goal: 300000,
    donors: 329,
    urgent: false,
    img: "https://picsum.photos/seed/women6/600/400"
  },
  {
    id: 7,
    title: "Plant 10,000 Trees – Green Bengaluru",
    desc: "Urban Bengaluru has lost 78% of its tree cover. Join us in a massive community-driven reforestation drive across the city.",
    category: "disaster",
    categoryLabel: "Environment",
    raised: 140000,
    goal: 200000,
    donors: 711,
    urgent: false,
    img: "https://picsum.photos/seed/trees7/600/400"
  },
  {
    id: 8,
    title: "Dialysis Support for 50 Patients",
    desc: "Chronic kidney disease patients in Tier-3 cities can't afford ₹1,500 per session. Your support keeps them alive.",
    category: "medical",
    categoryLabel: "Medical",
    raised: 620000,
    goal: 900000,
    donors: 1876,
    urgent: true,
    img: "https://picsum.photos/seed/kidney8/600/400"
  }
];

// ========= STATE =========
let currentFilter = "all";
let selectedAmount = 1000;
let currentCampaignTitle = "";
let paypalRendered = false;
let paypalLoadingPromise = null;

const PAYPAL_SDK_SRC = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
const campaignsGrid = document.getElementById("campaignsGrid");

// ========= FORMAT CURRENCY =========
function formatINR(amount) {
  if (amount >= 10000000) return "₹" + (amount / 10000000).toFixed(1) + " Cr";
  if (amount >= 100000) return "₹" + (amount / 100000).toFixed(1) + " L";
  if (amount >= 1000) return "₹" + (amount / 1000).toFixed(1) + "K";
  return "₹" + amount;
}

// ========= RENDER CAMPAIGNS =========
function renderCampaigns(filter) {
  const grid = campaignsGrid;
  if (!grid) return;
  grid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const filtered = filter === "all"
    ? campaigns
    : campaigns.filter(c => c.category === filter);

  filtered.forEach((c, i) => {
    const pct = Math.min(Math.round((c.raised / c.goal) * 100), 100);
    const card = document.createElement("div");
    card.className = "campaign-card reveal";
    card.style.transitionDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${c.img}" alt="${c.title}" loading="lazy" decoding="async" width="600" height="400" fetchpriority="low" />
        <span class="card-category">${c.categoryLabel}</span>
        ${c.urgent ? '<span class="card-urgent">🔴 Urgent</span>' : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${c.title}</h3>
        <p class="card-desc">${c.desc}</p>
        <div class="progress-wrap">
          <div class="progress-bar">
            <div class="progress-fill" style="width:0%" data-width="${pct}%"></div>
          </div>
          <div class="progress-meta">
            <span class="raised">${formatINR(c.raised)} raised</span>
            <span class="goal">Goal: ${formatINR(c.goal)}</span>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="card-donors"><strong>${c.donors.toLocaleString()}</strong> donors</div>
        <button class="btn-donate" data-campaign="${c.title}">💛 Donate Now</button>
      </div>
    `;
    fragment.appendChild(card);
  });
  grid.appendChild(fragment);

  // Animate progress bars and reveal cards
  requestAnimationFrame(() => {
    document.querySelectorAll(".campaign-card").forEach(card => {
      card.classList.add("visible");
      const fill = card.querySelector(".progress-fill");
      if (fill) {
        fill.style.width = fill.dataset.width;
      }
    });
  });
}

// ========= FILTER BUTTONS =========
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderCampaigns(currentFilter);
  });
});

if (campaignsGrid) {
  campaignsGrid.addEventListener("click", (e) => {
    const donateBtn = e.target.closest(".btn-donate");
    if (donateBtn) openDonateModal(donateBtn.dataset.campaign);
  });
}

// ========= NAVBAR SCROLL =========
const navbar = document.getElementById("navbar");
let navScrollTicking = false;

function updateNavbarScrollState() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

function onWindowScroll() {
  if (navScrollTicking) return;
  navScrollTicking = true;
  requestAnimationFrame(() => {
    updateNavbarScrollState();
    navScrollTicking = false;
  });
}

window.addEventListener("scroll", onWindowScroll, { passive: true });
updateNavbarScrollState();

// ========= HAMBURGER MENU =========
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

// ========= INTERSECTION OBSERVER (scroll reveal) =========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

function observeRevealElements() {
  document.querySelectorAll(".reveal:not(.campaign-card)").forEach(el => observer.observe(el));
}

// Reveal on load for static elements
document.querySelectorAll(".step-card, .cat-card, .testimonial-card, .cta-box").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

// ========= DONATE MODAL =========
const modal = document.getElementById("donateModal");
const modalClose = document.getElementById("modalClose");
const modalCampaignTitle = document.getElementById("modalCampaignTitle");
const selectedAmountDisplay = document.getElementById("selectedAmountDisplay");
const customAmountInput = document.getElementById("customAmount");

async function openDonateModal(campaignTitle) {
  currentCampaignTitle = campaignTitle;
  modalCampaignTitle.textContent = `Donate to: ${campaignTitle}`;
  selectedAmount = 1000;
  updateAmountDisplay();
  setActiveAmountBtn(1000);
  customAmountInput.value = "";
  modal.classList.add("open");
  document.body.style.overflow = "hidden";

  if (!paypalRendered) {
    const container = document.getElementById("paypal-button-container");
    container.textContent = "Loading secure checkout...";
    const paypalReady = await loadPayPalSdk();

    if (!modal.classList.contains("open")) return;
    if (paypalReady) {
      initPayPal();
    } else {
      showPayPalFallback(container);
    }
  }
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ========= AMOUNT SELECTION =========
function updateAmountDisplay() {
  selectedAmountDisplay.textContent = `₹${selectedAmount.toLocaleString("en-IN")}`;
}

function setActiveAmountBtn(amount) {
  document.querySelectorAll(".amount-btn").forEach(btn => {
    btn.classList.toggle("active", parseInt(btn.dataset.amount, 10) === amount);
  });
}

document.querySelectorAll(".amount-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    selectedAmount = parseInt(btn.dataset.amount, 10);
    customAmountInput.value = "";
    setActiveAmountBtn(selectedAmount);
    updateAmountDisplay();
  });
});

customAmountInput.addEventListener("input", () => {
  const val = parseInt(customAmountInput.value, 10);
  if (val && val >= 10) {
    selectedAmount = val;
    document.querySelectorAll(".amount-btn").forEach(b => b.classList.remove("active"));
    updateAmountDisplay();
  }
});

// ========= PAYPAL INTEGRATION =========
function loadPayPalSdk() {
  if (typeof paypal !== "undefined") return Promise.resolve(true);
  if (paypalLoadingPromise) return paypalLoadingPromise;

  paypalLoadingPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = PAYPAL_SDK_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(typeof paypal !== "undefined");
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return paypalLoadingPromise;
}

function initPayPal() {
  const container = document.getElementById("paypal-button-container");
  container.innerHTML = "";

  if (typeof paypal === "undefined") {
    // PayPal SDK not loaded (network issue) – show fallback
    showPayPalFallback(container);
    return;
  }

  try {
    paypal.Buttons({
      style: {
        layout: "vertical",
        color: "gold",
        shape: "rect",
        label: "donate",
        tagline: false
      },
      createOrder: function(data, actions) {
        // Convert INR to USD approximately (1 USD ≈ 83 INR) for sandbox
        const usdAmount = (selectedAmount / 83).toFixed(2);
        return actions.order.create({
          purchase_units: [{
            description: currentCampaignTitle,
            amount: {
              currency_code: "USD",
              value: usdAmount
            }
          }],
          application_context: {
            brand_name: "ImpactGuru Demo",
            user_action: "PAY_NOW"
          }
        });
      },
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          closeModal();
          showSuccessToast(details.payer.name.given_name || "You", selectedAmount);
        });
      },
      onError: function(err) {
        console.error("PayPal error:", err);
        showErrorToast();
      },
      onCancel: function() {
        console.log("PayPal payment cancelled.");
      }
    }).render("#paypal-button-container");

    paypalRendered = true;
  } catch (e) {
    showPayPalFallback(container);
  }
}

function showPayPalFallback(container) {
  // Fallback: direct PayPal donate link (sandbox)
  const usdAmount = (selectedAmount / 83).toFixed(2);
  container.innerHTML = `
    <a 
      href="https://www.sandbox.paypal.com/donate/?business=sb@impactguru-demo.com&amount=${usdAmount}&currency_code=USD&item_name=${encodeURIComponent(currentCampaignTitle)}"
      target="_blank"
      rel="noopener noreferrer"
      class="paypal-fallback-btn"
      style="
        display:block;
        background:#FFD140;
        color:#003087;
        text-align:center;
        padding:14px 24px;
        border-radius:8px;
        font-weight:700;
        font-size:1rem;
        text-decoration:none;
        font-family:'DM Sans',sans-serif;
        transition:background 0.2s;
        margin-bottom:8px;
      "
    >
      <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png" 
           alt="PayPal" style="vertical-align:middle;margin-right:8px;height:20px;" />
      Donate with PayPal
    </a>
  `;
}

// ========= TOAST NOTIFICATIONS =========
function showSuccessToast(name, amount) {
  createToast(
    `🎉 Thank you, ${name}!`,
    `Your donation of ₹${amount.toLocaleString("en-IN")} has been received. You're making a real difference!`,
    "#00897B"
  );
}

function showErrorToast() {
  createToast(
    "⚠️ Payment issue",
    "Something went wrong. Please try again or use the direct PayPal link.",
    "#F44336"
  );
}

function createToast(title, message, color) {
  const toast = document.createElement("div");
  toast.style.cssText = `
    position:fixed;bottom:28px;right:28px;z-index:3000;
    background:#fff;border-radius:12px;padding:20px 24px;
    box-shadow:0 20px 60px rgba(0,0,0,0.2);
    max-width:360px;width:calc(100% - 48px);
    border-left:4px solid ${color};
    animation:fadeUp 0.4s ease;
    font-family:'DM Sans',sans-serif;
  `;
  toast.innerHTML = `
    <strong style="display:block;font-size:1rem;color:#1A1A2E;margin-bottom:6px;">${title}</strong>
    <p style="font-size:0.85rem;color:#757575;margin:0;line-height:1.5;">${message}</p>
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ========= SMOOTH SCROLL =========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const hash = this.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

// ========= HERO COUNTER ANIMATION =========
function animateCounter(el, end, duration = 2000, prefix = "", suffix = "") {
  let start = 0;
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= end) { start = end; clearInterval(timer); }
    el.textContent = prefix + Math.floor(start).toLocaleString("en-IN") + suffix;
  }, 16);
}

// ========= INIT =========
document.addEventListener("DOMContentLoaded", () => {
  renderCampaigns("all");
  observeRevealElements();

  // Counter animation on hero stats
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroObserver.disconnect();
        // Numbers are static text in HTML, could animate if extracted to JS
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) heroObserver.observe(heroStats);
});
