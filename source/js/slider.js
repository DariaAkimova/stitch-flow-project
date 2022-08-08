const MOBILE_SCREEN = window.matchMedia("(max-width: 767px)");
const allSliders = document.querySelectorAll(".slider");
// const allSlides = document.querySelectorAll(".slider__item");
// const sliderLists = document.querySelectorAll(".slider__items");
// const prevSlidButton = document.querySelector(".slider-control--prev");
// const nextSlidButton = document.querySelector(".slider-control--next");
// const beforeImage = document.querySelector(".slider__item--before");
// const afterImage = document.querySelector(".slider__item--after");
// const sliderControls = document.querySelectorAll(".slider__control");

const hideSlide = (slidesToHide, noToHide) => {
    slidesToHide.forEach((slide) => {
      if (slide !== noToHide) {
        slide.classList.add("hidden");
      }
    });
  };

const initSliders = () => {
    if (MOBILE_SCREEN.matches) {
      allSliders.forEach((slider) => {
        const firstSlide = slider.querySelector(".slider__item:first-child");
        const slides = slider.querySelectorAll(".slider__item");
        const prevSlideButton = slider.querySelector(".slider-control--prev");
        const nextSlideButton = slider.querySelector(".slider-control--next");
        let currentSlideIndex = 0;
  
        const goToSlide = (slideIndex) => {
          slides[currentSlideIndex].classList.add("hidden");
          currentSlideIndex = (slideIndex + slides.length) % slides.length;
          slides[currentSlideIndex].classList.remove("hidden");
        };
  
        const showNextSlide = () => {
          goToSlide(currentSlideIndex + 1);
        };
  
        const showPrevSlide = () => {
          goToSlide(currentSlideIndex - 1);
        };
  
        hideSlide(slides, firstSlide);
        nextSlideButton.addEventListener("click", showNextSlide);
        prevSlideButton.addEventListener("click", showPrevSlide);
      });
    } else {
      allSliders.forEach((slider) => slider.classList.add("no-js"));
    }
  };

  export {initSliders};