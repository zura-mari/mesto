import Popup from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor( {popupSelector, handleFormSubmit} ) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = Array.from(this._popup.querySelectorAll('.popup__form-text'));
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
}