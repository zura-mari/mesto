const profile = document.querySelector('.profile');
const editInfoButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileForm = popup.querySelector('.popup__container');
const infoPopupCloseButton = popup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const aboutInput = document.querySelector('.popup__text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = profile.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const cardPopup = document.querySelector('.card-popup');
const cardForm = cardPopup.querySelector('.card-popup__form');
const cardPopupCloseButton = cardPopup.querySelector('.card-popup__close-button');
const cardHeading = cardPopup.querySelector('.popup__text_type_heading');
const cardImageLink = cardPopup.querySelector('.popup__text_type_link');
const image = document.querySelector('.image');
const imagePopup = image.querySelector('.image__popup');
const imagePopupCloseButton = image.querySelector('.image__popup-close');
const imagePopupHeading = image.querySelector('.image__heading');


//редактирование информации о пользователе.
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popup);
};

//добавляем модификатор для открытие попапа карточки
function openPopup(cardPopup) {
    cardPopup.classList.add('popup_opened');
};

//удаляем модификатор для закрытие попапа профиля
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

initialCards.forEach((cardElement) => {
    renderCard(cardElement, cards);
});

//добавляем карточки в index.html  
function renderCard(cardElement, cards) {
    cards.prepend(createCard(cardElement));
}

//создаем карточки из шаблона template
function createCard(element) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const delleteButton = cardElement.querySelector('.card__dellete');
    const likeButton = cardElement.querySelector('.card__like');
    const cardTitle = cardElement.querySelector('.card__heading');

    cardImage.style.backgroundImage = `url(${element.link})`;
    cardImage.addEventListener('click', () => handlePreviewPicture(element));

    delleteButton.addEventListener('click', handleDeleteCard);

    likeButton.addEventListener('click', handleLikeButton);

    cardTitle.textContent = element.name;

    return cardElement;
};

// Удаление карточки
function handleDeleteCard(evt) {
    evt.target.closest('.card').remove();
};

//лайк карточек
function handleLikeButton(evt) {
    evt.target.classList.toggle('card__like_active');
};

//открытие картинки в большом размере(попап картинки)
function handlePreviewPicture(element) {
    imagePopup.style.backgroundImage = `url(${element.link})`;
    imagePopupHeading.textContent = element.name;
    openPopup(image);
};

//Добавляем в массив новые свойство новыми значениями
function cardFormSubmitHandler(evt) {
    evt.preventDefault();

    const newCardTitle = cardHeading.value;
    const newCardLink = cardImageLink.value;
    const newElement = {
        name: newCardTitle,
        link: newCardLink,
    };

    renderCard(newElement, cards);
    cardForm.reset();
    closePopup(cardPopup);
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(popup);
});

//закрытие попапа профиля
infoPopupCloseButton.addEventListener('click', () => {
    closePopup(popup);
});

//отправка формы профиля
profileForm.addEventListener('submit', formSubmitHandler);

//отправка формы карточки
cardForm.addEventListener('submit', cardFormSubmitHandler);

//открытие попапа добавление карточки
addCardButton.addEventListener('click', () => {
    openPopup(cardPopup);
});

//закрытие попапа карточки
cardPopupCloseButton.addEventListener('click', () => {
    closePopup(cardPopup);
});

//закрытие попапа картинки
imagePopupCloseButton.addEventListener('click', () => {
    closePopup(image);
});