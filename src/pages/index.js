import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import {initialCards} from '../utils/initial-сards.js';
import {
    formConfig,
    editInfoButton,
    profileFormSubmitButton,
    addCardButton,
    cardsListSection,
    cardFormSubmitButton,
    cardForm,
    nameInput,
    aboutInput,
    profileForm,
    profileTitle,
    profileSubtitle
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';


 
const cardFormValidator = new FormValidator(formConfig, cardForm);

const profileFormValidator = new FormValidator(formConfig, profileForm);

const popupWithImage = new PopupWithImage('.popup_type_full-image');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
    userName: profileTitle,
    aboutUser: profileSubtitle
});

const popupWithUserForm = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data);
        popupWithUserForm.close();
    }
});

function createCard(data) {
    const card = new Card({
        name: data.name,
        link: data.link
    }, '.card-template_type_default', handleCardClick);

    const cardElement = card.generateCard();

    return cardElement
};

const cardsList = new Section({
        items: initialCards,
        renderer: (item) => {
            const card = new Card(item, '.card-template_type_default', handleCardClick);

            const cardElement = card.generateCard();

            cardsList.addItem(cardElement);
        },
    },
    cardsListSection
);

cardsList.renderItems()

const popupWithCardForm = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
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

function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    profileFormSubmitButton.classList.remove(formConfig.inactiveButtonClass);

    const userData = userInfo.getUserInfo();
    nameInput.value = userData.name;
    aboutInput.value = userData.about;
    popupWithUserForm.open(); 
});

//открытие попапа добавление карточки
addCardButton.addEventListener('click', () => {
    cardFormSubmitButton.classList.add(formConfig.inactiveButtonClass);
    popupWithCardForm.open()
});

popupWithUserForm.setEventListeners();
popupWithCardForm.setEventListeners();
cardFormValidator.enableValidation();
profileFormValidator.enableValidation();