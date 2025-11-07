// ================================
// Inject navigation + handle theme, menu, live time, collapsible entries, and active page highlight
// ================================

window.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Shared navigation HTML
  // -----------------------------
  const navHTML = `
    <nav class="navbar">
      <h1 class="logo">My Learning Journal</h1>

      <!-- Theme toggle button -->
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">🌙</button>

      <!-- Hamburger menu -->
      <div class="menu-toggle" id="mobile-menu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>

      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="journal.html">Journal</a></li>
        <li><a href="projects.html">Projects</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </nav>
  `;

  const navPlaceholder = document.getElementById("nav-placeholder");
  if (navPlaceholder) navPlaceholder.innerHTML = navHTML;

  // -----------------------------
  // Highlight Active Page
  // -----------------------------
  const currentPage = window.location.pathname.split("/").pop(); // e.g., "journal.html"
  const navLinksAll = document.querySelectorAll(".nav-links a");

  navLinksAll.forEach(link => {
    const linkPage = link.getAttribute("href");
    // Mark as active for matching page or homepage
    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });

  // -----------------------------
  // Hamburger Menu Toggle
  // -----------------------------
  const menu = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");
  if (menu && navLinks) {
    menu.addEventListener("click", () => {
      menu.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // -----------------------------
  // Dark / Light Theme Toggle
  // -----------------------------
  const body = document.body;
  const THEME_KEY = "lj_theme";
  const themeToggle = document.getElementById("theme-toggle");

  // Apply saved theme on load
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark") body.classList.add("dark");
  themeToggle.textContent = body.classList.contains("dark") ? "☀️" : "🌙";

  // Toggle theme on click
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  });

  // -----------------------------
  // Live Date & Time in Footer
  // -----------------------------
  const dateTimeElement = document.getElementById("date-time");
  if (dateTimeElement) {
    function updateDateTime() {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      dateTimeElement.textContent = now.toLocaleDateString("en-GB", options);
    }

    updateDateTime(); // initial call
    setInterval(updateDateTime, 1000); // update every second
  }

  // -----------------------------
  // Collapsible Journal Entries
  // -----------------------------
  const collapsibleArticles = document.querySelectorAll(".collapsible");
  collapsibleArticles.forEach(article => {
    const title = article.querySelector("h3");
    const contentBox = article.querySelector(".content-box");

    title.addEventListener("click", () => {
      article.classList.toggle("active");
      if (article.classList.contains("active")) {
        contentBox.style.maxHeight = contentBox.scrollHeight + "px";
        contentBox.style.paddingTop = "0.5rem";
      } else {
        contentBox.style.maxHeight = null;
        contentBox.style.paddingTop = "0";
      }
    });
  });
});
