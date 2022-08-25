import { sendData } from "./api.js";
import { form } from "./form-validation.js";

const successMessageFragment = document
  .querySelector("#success")
  .cloneNode(true).content;
const successMessage = successMessageFragment.querySelector(".success");
const messageUserName = successMessage.querySelector("#user-name");
const nameInput = form.querySelector('.input--name');
const errorMessageFragment = document
  .querySelector("#error")
  .cloneNode(true).content;
const errorMessage = errorMessageFragment.querySelector(".error");

const closeMessage = () => {
  if (document.body.lastChild === errorMessage) {
    closeErrorMessage();
  } else if (document.body.lastChild === successMessage) {
    closeSuccessMessage();
  }
};

const onMessageClick = () => closeMessage();

const addListenerClick = () =>
  document.addEventListener("click", onMessageClick);

const onDocumentEscKeydown = (evt) => {
  if (evt.key === "Escape") {
    evt.preventDefault();
   closeMessage();
  }
};

const addListenerEscKeydown = () =>
  document.addEventListener("keydown", onDocumentEscKeydown);

const removeAllListeners = () => {
  document.removeEventListener("click", onMessageClick);
  document.removeEventListener("keydown", onDocumentEscKeydown);
  };

function closeErrorMessage() {
  errorMessage.remove();
  removeAllListeners();
}

function closeSuccessMessage() {
  successMessage.remove();
  removeAllListeners();
}

const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  addListenerClick();
  addListenerEscKeydown();
};

const clearAll = () => form.reset();

const showSuccessMessage = () => {
  document.body.appendChild(successMessage);
  messageUserName.textContent = nameInput.value;
  console.log(nameInput.value);
  clearAll();
  addListenerClick();
  addListenerEscKeydown();
};

const setFormSubmit = () => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    sendData(showSuccessMessage, showErrorMessage, new FormData(evt.target));
  });
};

export { setFormSubmit };
