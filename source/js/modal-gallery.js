// import { allPhotosList, allPhotosImages  } from "./slider.js";
const fancyboxFragment = document
  .querySelector("#fancybox")
  .cloneNode(true).content;

const fancyboxSlider = fancyboxFragment.querySelector(".fancybox-slider");

const fancyboxImageBox = fancyboxFragment.querySelector(
  ".fancybox-slider__img-box"
);
const fancyboxCloseBtn = fancyboxFragment.querySelector(".close-btn");

const hideFancybox = () => {
  fancyboxSlider.remove();
};

const onModalClick = () => closeModal();

const addListenerClick = () =>
  fancyboxSlider.addEventListener("click", closeModal);

const onDocumentEscKeydown = (evt) => {
  if (evt.key === "Escape") {
    closeModal();
  }
};

const addListenerEscKeydown = () =>
  document.addEventListener("keydown", onDocumentEscKeydown);

const removeAllListeners = () => {
  document.removeEventListener("click", onModalClick);
  document.removeEventListener("keydown", onDocumentEscKeydown);
};

function closeModal() {
  hideFancybox();

  removeAllListeners();
}

const makeFancybox = (evt) => {
  document.body.appendChild(fancyboxSlider);
  const photoToShow = evt.target.parentNode.cloneNode(true);

  if (fancyboxImageBox.hasChildNodes()) {
    fancyboxImageBox.removeChild(fancyboxImageBox.firstChild);
  }

  fancyboxImageBox.appendChild(photoToShow);

  fancyboxCloseBtn.addEventListener("click", hideFancybox);
  addListenerClick();
  addListenerEscKeydown();
};

// Пока что сделать слайдер не получилось. Подамать еще.
// allPhotosImages.forEach((image) => {
//   const fancyboxImageBox = document.createElement("div");
//   fancyboxImageBox.classList.add("fancybox-slider__img-box", "slider-item");
//   fancyboxImageBox.appendChild(image);
//   fancyboxSlider.appendChild(fancyboxImageBox);
// });

// makeSlider(fancyboxSlider);

export { makeFancybox };
