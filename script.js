document.addEventListener("DOMContentLoaded", function () {
  const heroCarouselElement = document.getElementById("heroCarousel");

  if (heroCarouselElement) {
    const carousel = new bootstrap.Carousel(heroCarouselElement); // Initialize if not using data-bs-ride

    const animateSlide = (slideElement) => {
      if (!slideElement) return;

      const targets = slideElement.querySelectorAll(".anim-target");
      targets.forEach((target) => {
        const delay = parseInt(
          target.getAttribute("data-anim-delay") || "0",
          10
        );
        // Remove animation class immediately to reset
        target.classList.remove("animate");
        // Use setTimeout to apply animation after a delay
        setTimeout(() => {
          target.classList.add("animate");
        }, delay); // Apply specified delay
      });
    };

    const resetSlide = (slideElement) => {
      if (!slideElement) return;
      const targets = slideElement.querySelectorAll(".anim-target");
      targets.forEach((target) => {
        target.classList.remove("animate");
      });
    };

    // Animate the first active slide on page load
    const initialActiveSlide = heroCarouselElement.querySelector(
      ".carousel-item.active"
    );
    animateSlide(initialActiveSlide);

    // Handle animation on slide change
    heroCarouselElement.addEventListener("slide.bs.carousel", function (event) {
      // event.from is the index of the outgoing slide
      // event.to is the index of the incoming slide
      // event.relatedTarget is the incoming slide element

      // Reset the outgoing slide immediately before transition starts
      const carouselItems =
        heroCarouselElement.querySelectorAll(".carousel-item");
      if (carouselItems.length > event.from) {
        resetSlide(carouselItems[event.from]);
      }
    });

    // Animate the new slide *after* the transition is complete
    heroCarouselElement.addEventListener("slid.bs.carousel", function (event) {
      animateSlide(event.relatedTarget); // event.relatedTarget is the new active slide
    });
  }
});
// --- Intersection Observer for Animations ---

// Function to handle intersection changes
const handleIntersection = (entries, observer) => {
  entries.forEach((entry) => {
    // If element is in viewport
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      // Optional: Stop observing the element once it has been animated
      observer.unobserve(entry.target);
    }
  });
};

// Create a new Intersection Observer instance
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px",
  threshold: 0.1, // Trigger when 10% of the element is visible
};

const observer = new IntersectionObserver(handleIntersection, observerOptions);

// Select all elements that should be animated on scroll
const fadeUpElements = document.querySelectorAll(".anim-fade-up");

// Observe each element
if (fadeUpElements.length > 0) {
  fadeUpElements.forEach((el) => {
    observer.observe(el);
  });
}

// --- End Intersection Observer ---
// --- Add new elements to the Intersection Observer ---

// Select the new elements to animate
const ctaLeftElements = document.querySelectorAll(".anim-fade-in-left");
const ctaRightElements = document.querySelectorAll(".anim-fade-in-right");

// Observe the new elements (assuming 'observer' is already defined from previous steps)
if (typeof observer !== "undefined") {
  if (ctaLeftElements.length > 0) {
    ctaLeftElements.forEach((el) => {
      observer.observe(el);
    });
  }
  if (ctaRightElements.length > 0) {
    ctaRightElements.forEach((el) => {
      observer.observe(el);
    });
  }
} else {
  console.error(
    "Intersection Observer not defined. Make sure the observer code is included before this part."
  );
}

// --- End Adding New Elements ---
// --- Add new elements to the Intersection Observer ---

// Select the new elements to animate
const zoomInElements = document.querySelectorAll(".anim-zoom-in");

// Observe the new elements (assuming 'observer' is already defined)
if (typeof observer !== "undefined") {
  if (zoomInElements.length > 0) {
    zoomInElements.forEach((el) => {
      observer.observe(el);
    });
  }
} else {
  console.error(
    "Intersection Observer not defined. Make sure the observer code is included before this part."
  );
}

// --- End Adding New Elements ---
$(document).ready(function () {
  // Or use the vanilla JS DOMContentLoaded wrapper

  // Initialize Best Seller Carousel
  const $bestSellerCarousel = $(".best-seller-carousel");
  if ($bestSellerCarousel.length > 0) {
    $bestSellerCarousel.owlCarousel({
      loop: true, // Set to false if you don't want infinite loop
      margin: 20, // Space between items (adjust as needed)
      nav: false, // Disable default nav arrows
      dots: false, // Disable default dots
      autoplay: true, // Optional: Enable auto-play
      autoplayTimeout: 5000, // Time between slides (ms)
      autoplayHoverPause: true, // Pause on hover
      responsive: {
        0: {
          // breakpoint: 0px and up
          items: 1, // Show 1 item
        },
        576: {
          // breakpoint: 576px and up (sm)
          items: 2, // Show 2 items
        },
        768: {
          // breakpoint: 768px and up (md)
          items: 3, // Show 3 items
        },
        992: {
          // breakpoint: 992px and up (lg)
          items: 4, // Show 4 items
        },
      },
    });

    // Custom Navigation Events
    $("#best-seller-prev").on("click", function () {
      $bestSellerCarousel.trigger("prev.owl.carousel");
    });

    $("#best-seller-next").on("click", function () {
      $bestSellerCarousel.trigger("next.owl.carousel");
    });
  }
}); // End document ready
