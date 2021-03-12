import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
    };

    _getInputValues = () => {
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.popup__form-text'));

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    };

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        
        this._popupSelector.querySelector('.popup__form').reset();
      })
    };

    close() {
        super.close();
    };
}