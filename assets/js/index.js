tailwind.config = {
  theme: {
    extend: {
      colors: {
        secondary: "#E3B80D",
        customBlue: "#00008E",
        customBlack: "#02020E"
      },
      fontFamily: {
        raleway: "Raleway"
      }
    },
  },
}

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  // --- Toggle mobile menu ---
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent triggering outside click
    mobileMenu.classList.toggle("hidden");
  });

  // --- Close mobile menu when clicking outside ---
  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  // --- Close mobile menu on link/button click (except dropdown summary/links) ---
  mobileMenu.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", (e) => {
      const insideDropdown = e.target.closest("details");
      if (!insideDropdown) {
        mobileMenu.classList.add("hidden");
      }
    });
  });

  // --- Language Dropdown handling (works for desktop + mobile) ---
  document.querySelectorAll("details[id='languageDropdown']").forEach(dropdown => {
    const summary = dropdown.querySelector("summary");
    const links = dropdown.querySelectorAll("a[data-lang]");

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const lang = link.getAttribute("data-lang");

        // Replace summary text but keep arrow
        summary.childNodes[0].nodeValue = lang + " ";

        dropdown.removeAttribute("open"); // close dropdown
      });
    });
  });
});
