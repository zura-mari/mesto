import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;
        this._popupFullImage = this._popupSelector.querySelector('.popup__full-image');
        this._popupFullImageHeading = this._popupSelector.querySelector('.popup__full-image-heading')
    };

    open() {
        super.open();
        super.setEventListeners();
        this._popupFullImage.src = this._link;
        this._popupFullImage.alt = this._name;
        this._popupFullImageHeading.textContent = this._name;
    };
};