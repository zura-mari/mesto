export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
            document.addEventListener('keydown', this._handleEscClose.bind(this));
            document.addEventListener('mousedown', this._closePopupMousedown.bind(this));
    }

    close() { 
        this._popupSelector.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._handleEscClose.bind(this));
            document.removeEventListener('mousedown', this._closePopupMousedown.bind(this));
    }

    _handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    _closePopupMousedown = (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this))
        };
    }
