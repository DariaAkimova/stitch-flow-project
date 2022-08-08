import "./scroll-up.js";
import "./menu-mobile.js";
import "./form-validation.js";
import { initSliders } from "./slider.js";
import { setFormSubmit } from "./form-actions.js";

const noScriptElements = document.querySelectorAll(".no-js");

const activateScripts = () => {
  noScriptElements.forEach((element) => element.classList.remove("no-js"));
};

activateScripts();
initSliders();
setFormSubmit();
