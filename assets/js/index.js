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

// aos init
 AOS.init();

const swiper = new Swiper(".testimonial-swiper", {
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination-progressbar",
    type: "progressbar",
  },
  breakpoints: {
    640: { slidesPerView: 1 },
    1024: { slidesPerView: 2 },
  },
});

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

  document.querySelectorAll("details#languageDropdown").forEach(dropdown => {
    const summaryText = dropdown.querySelector(".languageText");
    const links = dropdown.querySelectorAll("a[data-lang]");

    links.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const lang = link.getAttribute("data-lang");

        // Update only the span text
        summaryText.textContent = lang;

        // Close dropdown
        dropdown.removeAttribute("open");
      });
    });
  });


  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const contentBox = document.getElementById("tab-content-box");

function updateContentRadius(position) {
  // Reset all top radius classes
  contentBox.classList.remove(
    "md:rounded-t-[30px]", "rounded-t-[16px]",
    "md:rounded-tr-[30px]", "rounded-tr-[16px]",
    "md:rounded-tl-[30px]", "rounded-tl-[16px]"
  );

  if (position === "first") {
    // Round only top-right
    contentBox.classList.add("md:rounded-tr-[30px]", "rounded-tr-[16px]");
  } else if (position === "last") {
    // Round only top-left
    contentBox.classList.add("md:rounded-tl-[30px]", "rounded-tl-[16px]");
  } else {
    // Round both top corners
    contentBox.classList.add("md:rounded-t-[30px]", "rounded-t-[16px]");
  }
}

  tabButtons.forEach((btn) => {
    const position = btn.dataset.position;

    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;

      // Reset all buttons
      tabButtons.forEach((b) => {
        b.classList.remove("bg-black", "text-white", "active");
        b.classList.add("bg-white", "text-black");
      });

      // Activate clicked button
      btn.classList.add("bg-black", "text-white", "active");
      btn.classList.remove("bg-white", "text-black");

      // Show relevant content
      tabContents.forEach((c) => c.classList.add("hidden"));
      document.getElementById(target).classList.remove("hidden");

      // Update radius
      updateContentRadius(position);
    });
  });

  // Default: first tab active
  tabButtons[0].classList.add("active");
  updateContentRadius("first");

});
