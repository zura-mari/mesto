import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import {initialCards} from './initial-сards.js';
import {
    formConfig,
    editInfoButton,
    profileFormSubmitButton,
    profilePopup,
    addCardButton,
    cardPopup,
    cardListSection,
    cardImage,
    cardFormSubmitButton,
    cardForm,
    nameInput,
    aboutInput,
    profileForm,
    profileTitle,
    profileSubtitle
} from './constants.js';
import UserInfo from './UserInfo.js';
import '../pages/index.css';

const cardFormValidator = new FormValidator(formConfig, cardForm);
const profileFormValidator = new FormValidator(formConfig, profileForm);

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '.card-template_type_default', handleCardClick);

            const cardElement = card.generateCard();

            cardsList.addItem(cardElement);
        },
    },
    cardListSection
);

const popupWithCardForm = new PopupWithForm({
    popupSelector: cardPopup,
    handleFormSubmit: (cardData) => {
        const createNewCard = new Card({
            name: cardData.name,
            link: cardData.link
        }, '.card-template_type_default', handleCardClick);

        const cardElement = createNewCard.generateCard();

        cardsList.addItem(cardElement);
        popupWithCardForm.close();
    }
});

const popupWithUserForm = new PopupWithForm({
    popupSelector: profilePopup,
    handleFormSubmit: (userData) => {
        const userInfo = new UserInfo({
            name: userData.name,
            about: userData.about
        }, profileTitle, profileSubtitle);
        userInfo.setUserInfo();
        popupWithUserForm.close();
    }
});

//отрисовка карточек
cardsList.renderItems();

function handleCardClick(name, link) {
    const cardImagePopup = new PopupWithImage(cardImage, name, link);
    cardImagePopup.open();
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    profileFormSubmitButton.classList.remove(formConfig.inactiveButtonClass);
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    popupWithUserForm.open()
    cardFormValidator.resetErrorMessage();
});

//открытие попапа добавление карточки
addCardButton.addEventListener('click', () => {
    cardFormSubmitButton.classList.add(formConfig.inactiveButtonClass);
    popupWithCardForm.open()
    profileFormValidator.resetErrorMessage();
});
popupWithUserForm.setEventListeners();
popupWithCardForm.setEventListeners();
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();