export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._name, this._link);
        });
    }

    _handleDeleteCard = () => {
        this._element.closest('.card').remove();
    };

    _handleLikeButton = () => {
        this._cardLikeButton.classList.toggle('card__like_active');
    };
};