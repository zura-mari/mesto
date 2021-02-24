import {openPopup} from '../scripts/utils.js';

const image = document.querySelector('.popup_type_full-image');
const imagePopup = document.querySelector('.popup__full-image');
const imagePopupHeading = image.querySelector('.popup__full-image-heading');


export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._element.querySelector('.card__heading').textContent = this._name;
        return this._element;
    }

    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners = () => {
        this._cardImage = this._element.querySelector('.card__image');
        this._cardDeleteButton = this._element.querySelector('.card__delete');
        this._cardLikeButton = this._element.querySelector('.card__like');

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeButton();
        });

        this._cardImage.addEventListener('click', () => {
            this._handlePreviewPicture();
        });
    }

    _handleDeleteCard = () => {
        this._element.closest('.card').remove();
    };

    _handleLikeButton = () => {
        this._cardLikeButton.classList.toggle('card__like_active');
    };

    _handlePreviewPicture = () =>{
        imagePopup.src = this._link;
        imagePopup.alt = this._name;
        imagePopupHeading.textContent = this._name;
        openPopup(image);
    }
};