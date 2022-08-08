//--validation module--

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

export {form};

// hideSlide();
// activateSlider();

// new function

// const testCorrectInput = () => {
//   contactFieldes.forEach((field) => {
//     const fieldInput = field.querySelector(".contacts-form__input");
//     const fieldLabel = field.querySelector(".contacts-form__label").textContent;
//     const fieldPattern = fieldInput.getAttribute("pattern");

//     const inputValue = fieldInput.value;

//     if (fieldPattern.test(inputValue) == false) {
//       fieldInput.setCustomValidity(`Введите корректный ${fieldLabel}`);
//       console.log(inputValue);
//     } else {
//       fieldInput.setCustomValidity("");
//     }
//     fieldInput.reportValidity();
// const fieldObject = {
//   input: fieldInput,
//   label: fieldLabel,
//   reg: fieldPattern,
// };
// console.log(fieldObject)
// return fieldObject;
// });

// console.log(fieldObject);
// return;
// };
// makeFieldObjext();

// const testCorrectInput = contactFieldes.forEach((field) => {
// const inputValue = field.input.value;
// const inputReg = field.reg;
// const inputLabel = field.label;
// const contactInput = field.input;

// console.log(field);

//   if (inputReg.test(inputValue)== false) {
//     field.input.setCustomValidity (`Введите корректный ${inputLabel}`);
//    console.log(inputValue)
//   } else {
//    contactInput.setCustomValidity('');
//  }
//   contactInput.reportValidity();
//  ;
// });

// const validatePhoneInput = () => {

//   phoneInput.addEventListener('input', ()=> {
//     const phoneValue = phoneInput.value;

//     if (regExPhone.test(phoneValue)== false) {
//       phoneInput.setCustomValidity ("Введите корректный номер телефона");
//      console.log(phoneInput.value)
//     } else {
//      phoneInput.setCustomValidity('');
//    }
//     phoneInput.reportValidity();
//    ;
// }

// const testCorrectInput = () => {
//   const phoneValue = phoneInput.value;

//   if (regExPhone.test(phoneValue)== false) {
//     phoneInput.setCustomValidity ("Введите корректный номер телефона");
//    console.log(phoneInput.value)
//   } else {
//    phoneInput.setCustomValidity('');
//  }
//   phoneInput.reportValidity();
//  ;
// }

// const onInputValidate = () => {
//   phoneInput.addEventListener('input', testCorrectInput);
// }
// const phoneField = {
//   label: "телефон",
//   input: phoneInput,
//   reg: regExPhone,
// };

// const emailField = {
//   label: "email",
//   input: emailInput,
//   re: regExEmail,
// };

//  const testCorrectInput = (input) => {
//   const inputValue = input.value;
//   const regExPhone = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
//   const regExEmail = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
//   let inputRegExp;
//   let messageText;

//   switch (input) {
//     case phoneInput:
//       inputRegExp = regExPhone;
//       messageText = "номер телефона";
//       break;
//     case emailInput:
//       inputRegExp = regExEmail;
//       messageText = "email";
//       break;
//   }
//   console.log(inputRegExp.test(inputValue));

//   if (inputRegExp.test(inputValue)) {
//     input.setCustomValidity("");
//   } else {
//     input.setCustomValidity(`Введите корректный ${messageText}`);
//   }
//   input.reportValidity();
// };

// const onInputValidate = (input) => {
//   input.addEventListener("input", testCorrectInput);
// };
