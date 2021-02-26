import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import {initialCards} from '../scripts/initial-сards.js';
import {openPopup,closePopup} from '../scripts/utils.js';

const profile = document.querySelector('.profile');
const editInfoButton = profile.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const profileEdit = document.querySelector('.popup_type_edit-profile');
const profileForm = profileEdit.querySelector('.popup__form_type_edit-profile-form');
const profileFormSubmitButton = document.querySelector('.popup__form-btn_type_edit-profile');
const infoPopupCloseButton = profileEdit.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__form-text_type_name');
const aboutInput = document.querySelector('.popup__form-text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = profile.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardPopup = document.querySelector('.popup_type_add-card');
const cardForm = cardPopup.querySelector('.popup__form_type_add-card');
const cardFormSubmitButton = cardPopup.querySelector('.popup__form-btn_type_add-card');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close-button_type_add-card');
const cardHeading = cardPopup.querySelector('.popup__form-text_type_heading');
const cardImageLink = cardPopup.querySelector('.popup__form-text_type_link');
const image = document.querySelector('.popup_type_full-image');
const imagePopupCloseButton = image.querySelector('.popup__close-button_type_full-image');

const formConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-text',
    submitButtonSelector: '.popup__form-btn',
    inactiveButtonClass: 'popup__form-btn_disabled',
    inputErrorClass: 'popup__form-text_type_error',
    errorClass: 'popup__form-text-error_visible'
};

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profileFormValidator = new FormValidator(formConfig, profileForm);

//редактирование информации о пользователе.
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(profilePopup);
};

initialCards.forEach((cardElement) => {
    renderCard(cardElement, cards);
});

function createCard(element) {
    const card = new Card(element, '.card-template_type_default');
    const cardElement = card.generateCard();

    return cardElement
}

//добавляем карточки в index.html  
function renderCard(cardElement, cards) {
    cards.prepend(createCard(cardElement));
}

//Добавляем в массив новые свойство новыми значениями
function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const newCardTitle = cardHeading.value;
    const newCardLink = cardImageLink.value;

    renderCard({
        name: newCardTitle,
        link: newCardLink,
    }, cards);
    cardForm.reset();
    closePopup(cardPopup);
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    profileFormSubmitButton.classList.remove(formConfig.inactiveButtonClass);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(profilePopup);
    cardFormValidator.resetErrorMessage();
});

//закрытие попапа профиля
infoPopupCloseButton.addEventListener('click', () => {
    closePopup(profilePopup);
});

//отправка формы профиля
profileForm.addEventListener('submit', handleProfileFormSubmit);

//отправка формы карточки
cardForm.addEventListener('submit', handleCardFormSubmit);

//открытие попапа добавление карточки
addCardButton.addEventListener('click', () => {
    cardFormSubmitButton.classList.add(formConfig.inactiveButtonClass);
    openPopup(cardPopup);
    profileFormValidator.resetErrorMessage();
});

//закрытие попапа карточки
cardPopupCloseButton.addEventListener('click', () => {
    closePopup(cardPopup);
});

//закрытие попапа картинки на крестик
imagePopupCloseButton.addEventListener('click', () => {
    closePopup(image);
});

cardFormValidator.enableValidation();
profileFormValidator.enableValidation();