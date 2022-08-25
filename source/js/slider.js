import { makeList, removeList } from "./dom-changes.js";
import { makeFancybox } from "./modal-gallery.js";

const MOBILE_SCREEN = window.matchMedia("(max-width: 767px)");
const allSliders = document.querySelectorAll(".slider");
const slidersList = document.querySelector(".all-products");
const sliderContainers = [
  ...slidersList.querySelectorAll(".all-products__item"),
];
const allSlides = [...document.querySelectorAll(".slider__item")];
const exampleSection = document.querySelector(".examples");
const exampleContainer = exampleSection.querySelector(".container");

const hideSlide = (slidesToHide, noToHide) => {
  slidesToHide.forEach((slide) => {
    if (slide !== noToHide) {
      slide.classList.add("hidden");
    }
  });
};

const makeSlider = (slider) => {
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
};

const initSliders = () => {
  if (MOBILE_SCREEN.matches) {
    allSliders.forEach((slider) => {
      makeSlider(slider);
    });
  } else {
    const allPhotosList = makeList(allSlides);
    const allPhotosListItems = allPhotosList.querySelectorAll(
      ".visualisation__item"
    );
    allPhotosListItems.forEach((item) => item.classList.remove("slider__item"));

    const allPhotosImages = allPhotosList.querySelectorAll(
      ".visualisation__image"
    );
    allPhotosList.classList.add(
      "examples__items",
      "examples__items--gallery-mode",
      "visualisation"
    );

    slidersList.remove();
    removeList(sliderContainers);

    exampleContainer.appendChild(allPhotosList);

    allPhotosImages.forEach((photo) =>
      photo.addEventListener("click", makeFancybox)
    );
  }
};

export { initSliders };
