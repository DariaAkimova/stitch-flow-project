const form = document.querySelector(".form");
const allInputs = form.querySelectorAll("input");
const phoneInput = form.querySelector(".input--phone");
const emailInput = form.querySelector(".input--email");
const requiredInputs = form.querySelectorAll("input[required]");
const submitButton = form.querySelector(".form__submit");
const validationMessage = form.querySelector(".validation-error");
const contactFieldes = form.querySelectorAll(".contacts-form__field");
const contactInputs = form.querySelectorAll(".contacts-form__input");
const regExPhone = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
const regExEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;

const testCorrectPhoneInput = () => {
  const phoneValue = phoneInput.value;

  if (regExPhone.test(phoneValue)) {
    phoneInput.setCustomValidity("");
    phoneInput.classList.remove("input--error");
  } else {
    phoneInput.setCustomValidity(`Введите корректный номер телефона`);
    phoneInput.classList.add("input--error");
  }
  phoneInput.reportValidity();
};

const testCorrectEmailInput = () => {
  const emailValue = emailInput.value;

  if (regExEmail.test(emailValue)) {
    emailInput.setCustomValidity("");
    emailInput.classList.remove("input--error");
  } else {
    emailInput.setCustomValidity(`Введите корректный email`);
    emailInput.classList.add("input--error");
  }
  emailInput.reportValidity();
};

const onInputValidate = () => {
  contactInputs.forEach((input) => {
    if (input === phoneInput) {
      input.addEventListener("input", testCorrectPhoneInput);
    } else if (input === emailInput) {
      input.addEventListener("input", testCorrectEmailInput);
    }
  });
};

const showValidationMessage = () => {
  const formWithError = [...requiredInputs].some(
    (input) => (input.type === "checkbox" && !input.checked) || !input.value
  );

  if (formWithError) {
    validationMessage.classList.remove("hidden");
  } else {
    validationMessage.classList.add("hidden");
  }
};

const showMessageOnInput = () => {
  allInputs.forEach((input) => {
    input.addEventListener("input", showValidationMessage);
  });
};

submitButton.addEventListener("click", () => {
  showValidationMessage();
  showMessageOnInput();
  testCorrectPhoneInput();
  testCorrectEmailInput();
  onInputValidate();
});

form.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    showValidationMessage();
    showMessageOnInput();
  }
});

export { form };
