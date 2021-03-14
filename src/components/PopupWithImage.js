import Popup from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupFullImage = this._popup.querySelector('.popup__full-image');
        this._popupFullImageHeading = this._popup.querySelector('.popup__full-image-heading')
    };

    open(name, link) {
        this._popupFullImage.src = link;
        this._popupFullImage.alt = name;
        this._popupFullImageHeading.textContent = name;
        super.open();
    };
};