import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { initialCards } from '../scripts/initial-сards.js';

(function(){
const profile = document.querySelector('.profile');
const editInfoButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
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

//редактирование информации о пользователе.
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    closePopup(popup);
};

//добавляем модификатор для открытие попапа карточки
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEsc);
    document.addEventListener('mousedown', closePopupMousedown);
    resetErrorMessage();
    cardForm.reset();
};

//удаляем модификатор для закрытие попапа профиля
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupWithEsc);
    document.removeEventListener('mousedown', closePopupMousedown);
};

//Закрытие попапа нажатием на Esc
function closePopupWithEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(document.querySelector('.popup_opened'))
    }
};

//Закрытие попапа кликом на оверлей
function closePopupMousedown(evt) {
    if (evt.target.classList.contains('popup_opened')) {
        closePopup(evt.target);
    }
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

const formList = Array.from(document.querySelectorAll(formConfig.formSelector));
formList.forEach((formElement) => {
    const formValidator = new FormValidator(formConfig, formElement);
    formValidator.enableValidation();
});

function resetErrorMessage() {
    const formInput = Array.from(document.querySelectorAll(formConfig.inputSelector));
    const errorElement = Array.from(document.querySelectorAll('.popup__form-text-error'));
    formInput.forEach((inputElement) => {
        inputElement.classList.remove(formConfig.inputErrorClass);
    })

    errorElement.forEach((element) => {
        element.textContent = '';
    })
};

//Добавляем в массив новые свойство новыми значениями
function cardFormSubmitHandler(evt) {
    cardFormSubmitButton.classList.add(formConfig.inactiveButtonClass);
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
})();