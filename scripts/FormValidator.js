export default class FormValidator {
    constructor(formConfig, formElement) {
        this._formConfig = formConfig;
        this._formElement = formElement;
    }

    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _showInputError = (element, inputElement, errorMessage) => {
        this._errorElement = element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._formConfig.inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._formConfig.errorClass);
    };

    _hideInputError = (element, inputElement) => {
        this._errorElement = element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._formConfig.inputErrorClass);
        this._errorElement.classList.remove(this._formConfig.errorClass);
        this._errorElement.textContent = '';
    };

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(this._formElement, inputElement, inputElement.validationMessage, this._formConfig);
        } else {
            this._hideInputError(this._formElement, inputElement, this._formConfig);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    };

    _setEventListeners = () => {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._formConfig.submitButtonSelector);
        this._toggleButtonState(this._inputList, this._buttonElement, this._formConfig);

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };

};