import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        //this._formSelector = formSelector;
        //this._form = document.querySelector('.popup_type_add-card');
        //this._formSelector = formSelector;
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
        //this.close.bind(this);
        //this._form.reset();
        //this._popupSelector.reset()
        this._popupSelector.querySelector('.popup__form').reset();
      })
    };

    close() {
        super.close();
        //super.setEventListeners();
        //this._form.querySelector('.popup__form').reset();
    };
}