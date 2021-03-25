import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__form-text'));
        this._submitButton = this._popup.querySelector('.popup__form-btn');
        this._submitButtonText = this._submitButton.textContent;
    };

    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      })
    };

    close() {
        super.close();
        this._popup.querySelector('.popup__form').reset();
    };

    renderLoading(isLoading) {
        if (isLoading) {
          this._submitButton.classList.add('popup__form-btn_loading');
          this._submitButton.textContent = `Сохранение...`;
        } else {
          this._submitButton.classList.remove('popup__form-btn_loading');
          this._submitButton.textContent = this._submitButtonText;
        }
      }
}