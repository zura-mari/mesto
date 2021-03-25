import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';
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
    profileSubtitle,
    avatarImage,
    avatarForm,
    avatarFormSubmitButton,
    editProfileAvatar,
    baseUrl,
    token
} from '../utils/constants.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import PopupWithConfirm from '../components/PopupWithConfirm.js';

let tempCard = null;
let currentUserId = null;

const api = new Api({
    baseUrl: baseUrl,
    headers: {
        authorization: token,
        'Content-Type': 'application/json',
    }
})

const cardFormValidator = new FormValidator(formConfig, cardForm);
cardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(formConfig, profileForm);
profileFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(formConfig, avatarForm);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_full-image');
popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirm('.popup_type_delete-card');
popupWithConfirm.setEventListeners();

const userInfo = new UserInfo({
    userName: profileTitle,
    aboutUser: profileSubtitle
});

const popupWithAvatarForm = new PopupWithForm({
    popupSelector: '.popup_type_edit-avatar',
    handleFormSubmit: (item) => {
        popupWithAvatarForm.renderLoading(true);
        api.setAvatar(item)
            .then((data) => {
                avatarImage.style.backgroundImage = `url(${data.avatar})`;
                popupWithAvatarForm.close();
            })
            .catch((err) => {
                console.log(`${err}`)
            })
            .finally(() => {
                popupWithAvatarForm.renderLoading(false);
            })
    }
});
popupWithAvatarForm.setEventListeners();


const popupWithUserForm = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (item) => {
        popupWithUserForm.renderLoading(true);
        api.setUserInfo(item)
            .then((data) => {
                userInfo.setUserInfo(data);
                popupWithUserForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                popupWithUserForm.renderLoading(false);
            })
    }
});
popupWithUserForm.setEventListeners();

function createCard(data, currentUserId, cardsList) {
    const newCard = new Card(data, '.card-template_type_default', handleCardClick, {
            handleLikeClick: () => handleLikeClick(newCard, data),
            handleDeleteIconClick: () => handleDeleteIconClick(newCard)
        },
        currentUserId);

    const cardElement = newCard.generateCard();
    newCard.setLike(data);
    cardsList.addItem(cardElement);
};

const cardsList = new Section({
    renderer: (item) => {
        createCard(item, currentUserId, cardsList);
    },
}, cardsListSection);


const popupWithCardForm = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (item) => {
        popupWithCardForm.renderLoading(true);
        api.addCard(item)
            .then((data) => {
                createCard(data, currentUserId, cardsList);
                popupWithCardForm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            })
            .finally(() => {
                popupWithCardForm.renderLoading(false);
            })
    }
});
popupWithCardForm.setEventListeners();


function handleCardClick(name, link) {
    popupWithImage.open(name, link);
};

function handleLikeClick(card, data) {
    const promise = card.isLiked() ? api.dislikeCard(data._id) : api.likeCard(data._id);
    promise
        .then((data) => {
            card.setLike(data);
        })
        .catch((err) => {
            console.log(`${err}`);
        });
};



function handleDeleteIconClick(card) {
    popupWithConfirm.setFormSubmitHandler(() => {
        api.deleteCard(card._id)
            .then(() => {
                card.deleteCard();

                popupWithConfirm.close();
            })
            .catch((err) => {
                console.log(`${err}`);
            });
    });
    popupWithConfirm.open();
};




//открытие попапа обновление аватара
editProfileAvatar.addEventListener('click', () => {
    avatarFormSubmitButton.classList.remove(formConfig.inactiveButtonClass);
    popupWithAvatarForm.open();
});


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

api.getAllNeededData().then(([cardsData, userData]) => {
        userInfo.setUserInfo(userData);
        avatarImage.style.backgroundImage = `url(${userData.avatar})`;
        currentUserId = userData._id;

        cardsList.renderItems(cardsData);
    })
    .catch((err) => {
        console.log(`${err}`);
    });