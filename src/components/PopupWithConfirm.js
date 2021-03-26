import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
    constructor(popupSelector, { submit }) {
        super(popupSelector);
        this._submit = submit;
        this._setFormSubmitHandler = this._setFormSubmitHandler.bind(this);
        this._form = this._popup.querySelector('.popup__form');
    };

    _setFormSubmitHandler() {
        this._submit(this._data);
        this._form.removeEventListener('submit', this._setFormSubmitHandler);
      }
    
      setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
                        evt.preventDefault();
                        this._setFormSubmitHandler();
        super.setEventListeners();
      })
    }
    
      open(data) {
        this._data = data;
        super.open();
      }
    }
