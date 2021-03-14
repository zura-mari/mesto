 export default class FormValidator {
    constructor(formConfig, formElement) {
        this._formConfig = formConfig;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._formConfig.submitButtonSelector);
    };

    // добавляем класс с ошибкой
    _showInputError = (element, inputElement) => {
        this._errorElement = element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._formConfig.inputErrorClass);
        this._errorElement.textContent = inputElement.validationMessage;;
        this._errorElement.classList.add(this._formConfig.errorClass);
    };

    //удаляем класс с ошибкой(Скрываем сообщение об ошибке)
    _hideInputError = (element, inputElement) => {
        this._errorElement = element.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._formConfig.inputErrorClass);
        this._errorElement.classList.remove(this._formConfig.errorClass);
        this._errorElement.textContent = '';
    };

    //проверяем валидность поля
    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку
            this._showInputError(this._formElement, inputElement, inputElement.validationMessage, this._formConfig);
        } else {
            // Если проходит, скроем
            // this._hideInputError(this._formElement, inputElement, this._formConfig);
            this._hideInputError(this._formElement, inputElement, this._formConfig);
        }
    };

    //принимаем массив полей
    _hasInvalidInput = () => {
        // проходим по этому массиву методом some
        return this._inputList.some((inputElement) => {
            // Если поле не валидно, колбэк вернёт true
            return !inputElement.validity.valid;
        })
    };

    //сбрасываем ошибки инпутов
    // resetErrorMessage = () => {
    // //         this._inputList = Array.from(this._formElement.querySelectorAll(this._formConfig.inputSelector));
    // //     this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
    // //     this._inputList.forEach((inputElement) => {
    // //     this._hideInputError(inputElement);
    // //     });
    // //   }
    //     //const formInput = Array.from(formElement.querySelectorAll(this._formConfig.inputSelector));
    //     //const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        

    //     this._inputList.forEach((inputElement) => {
    //         this._hideInputError(inputElement);
    // });
    //     this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);

    //     // this._errorElement.forEach((element) => {
    //     //     element.textContent = '';
    //     // })
    // };

    //сделаем кнопку активной или неактивной
    _toggleButtonState = () => {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._formConfig.inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._formConfig.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {

        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };

    //включаем валидацию формы.
    enableValidation = () => {
        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    };
};