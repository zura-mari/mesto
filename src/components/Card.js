export default class Card {
    constructor(data, cardSelector, handleCardClick, { handleLikeClick, handleDeleteIconClick}, currentId) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._currentId = currentId;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
    }

    _getTemplate = () => {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return cardElement;
    }

    _checkIsOwnCard() {
        if (this._ownerId === this._currentId) {
            this._element.querySelector('.card__delete').style.display = 'block';
        }    
    };

    generateCard = () => {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._element.querySelector('.card__heading').textContent = this._name;

        this._element.querySelector('.card__like-count').textContent = this._likes.length;

        this._checkIsOwnCard();

        return this._element;
    }

    isLiked() {
        return this._isLiked;
    }

    setLike(data) {
        this._isLiked = data.likes.filter((item) => { return item._id == this._currentId; }).length > 0;
        this._element.querySelector('.card__like-count').textContent = data.likes.length;
        if (this._isLiked) {
            this._cardLikeButton.classList.add('card__like_active');
        } else {
            this._cardLikeButton.classList.remove('card__like_active');
        };
    };

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners = () => {
        this._cardImage = this._element.querySelector('.card__image');
        this._cardDeleteButton = this._element.querySelector('.card__delete');
        this._cardLikeButton = this._element.querySelector('.card__like');

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteIconClick();
        });

        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
};