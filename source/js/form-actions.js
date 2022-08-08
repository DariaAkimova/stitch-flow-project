import { sendData } from "./api.js";
import { form } from "./form-validation.js";


const successMessageFragment = document
  .querySelector("#success")
  .cloneNode(true).content;
const successMessage = successMessageFragment.querySelector(".success");
const messageUserName = successMessage.querySelector("#user-name");
const errorMessageFragment = document
  .querySelector("#error")
  .cloneNode(true).content;
const errorMessage = errorMessageFragment.querySelector(".error");
const errorButton = errorMessage.querySelector(".error__button");

const onMessageClick = () => {
    if (document.body.lastChild === errorMessage) {
      closeErrorMessage();
    } else if (document.body.lastChild === successMessage) {
      closeSuccessMessage();
    }
  };
  
  const addListenerClick = () =>
    document.addEventListener("click", onMessageClick);
  
  const onDocumentEscKeydown = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      if (document.body.lastChild === errorMessage) {
        closeErrorMessage();
      } else if (document.body.lastChild === successMessage) {
        closeSuccessMessage();
      }
    }
  };
  
  const addListenerEscKeydown = () =>
    document.addEventListener("keydown", onDocumentEscKeydown);
  
  const onErrorButtonClick = () => {
    closeErrorMessage();
  };
  
  const addErrorButtonClickListener = () =>
    errorButton.addEventListener("click", onErrorButtonClick);
  
  const removeAllListeners = () => {
    document.removeEventListener("click", onMessageClick);
    document.removeEventListener("keydown", onDocumentEscKeydown);
    errorButton.removeEventListener("click", onErrorButtonClick);
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

  export {setFormSubmit};