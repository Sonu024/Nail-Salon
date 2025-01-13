document.addEventListener("DOMContentLoaded", () => {
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;
  
    function showTestimonial(index) {
      testimonials.forEach((testimonial, i) => {
        if (i === index) {
          testimonial.classList.add("active");
        } else {
          testimonial.classList.remove("active");
        }
      });
    }
  
    function nextTestimonial() {
      currentIndex = (currentIndex + 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
      console.log(currentIndex);
      
    }
  
    function prevTestimonial() {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
      console.log(currentIndex);
    }
  
    nextButton.addEventListener("click", nextTestimonial);
    prevButton.addEventListener("click", prevTestimonial);
  
    // Initialize
    showTestimonial(currentIndex);
  
    // Auto-slide every 5 seconds
   // setInterval(nextTestimonial, 5000);
  });

//Gallery section
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
const prevButton = document.querySelector('.gallery-button.prev');
const nextButton = document.querySelector('.gallery-button.next');

let currentIndex = 0;

// Duplicate the gallery items for seamless looping
galleryItems.forEach(item => galleryContainer.appendChild(item.cloneNode(true)));

// Calculate width of a single item
const itemWidth = galleryItems[0].offsetWidth;

function updateGallery() {
  galleryContainer.style.transition = 'transform 0.5s ease-in-out';
  galleryContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Reset transition for seamless looping
  galleryContainer.addEventListener('transitionend', () => {
    if (currentIndex === galleryItems.length) {
      galleryContainer.style.transition = 'none';
      currentIndex = 0;
      galleryContainer.style.transform = `translateX(0px)`;
    }
    if (currentIndex < 0) {
      galleryContainer.style.transition = 'none';
      currentIndex = galleryItems.length - 1;
      galleryContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  });
}

function nextSlide() {
  currentIndex++;
  updateGallery();
}

function prevSlide() {
  currentIndex--;
  updateGallery();
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// Automatic sliding
let autoSlideInterval = setInterval(nextSlide, 3000);

// Pause auto-slide on hover
galleryContainer.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
galleryContainer.addEventListener('mouseleave', () => autoSlideInterval = setInterval(nextSlide, 3000));
