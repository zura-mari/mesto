const profile = document.querySelector('.profile');
const editInfoButton = profile.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const profileForm = popup.querySelector('.popup__container');
const InfoPopupCloseButton = popup.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const aboutInput = document.querySelector('.popup__text_type_about');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const addCardButton = profile.querySelector('.profile__add-button');
const cards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;
const cardPopup = document.querySelector('.card-popup');
const cardForm = cardPopup.querySelector('.card__add-form');
const cardPopupCloseButton = cardPopup.querySelector('.card__popup_close-button');
const cardHeading = cardPopup.querySelector('.popup__text_type_heading');
const cardImageLink = cardPopup.querySelector('.popup__text_type_link');
const image = document.querySelector('.image');
const imagePopup = image.querySelector('.image__popup');
const imagePopupCloseButton = image.querySelector('.image__popup_close-button');
const imagePopupHeading = image.querySelector('.image__heading');

const initialCards = [
    {
        name: 'Тбилиси',
        link: 'https://avatars.mds.yandex.net/get-zen_doc/1137439/pub_5b5f4e12d8372f00a9280dd1_5b5f5109d8824e00a9c24dca/scale_1200'

    },
    {
        name: 'Мцхета',
        link: 'https://i03.fotocdn.net/s123/78cbb85b138e1486/public_pin_l/2808522122.jpg'
    },
    {
        name: 'Храм Цминда Самеба',
        link: 'https://www.happinessplunge.com/wp-content/uploads/2014/02/Sameba-Cathedral-.jpg'
    },
    {
        name: 'Метехи',
        link: 'https://img.tourister.ru/files/2/1/4/8/4/7/8/2/clones/870_600_fixedwidth.jpg'
    },
    {
        name: 'Ушгули',
        link: 'https://a.d-cd.net/NCAAAgEIP2A-960.jpg'
    },
    {
        name: 'Вардзия',
        link: 'https://a.d-cd.net/XgAAAgBdZuA-1920.jpg'
    }
];

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


function render() {
    initialCards.reverse();
    initialCards.forEach(createCard);
}

//добавляем карточки в index.html  
function addCardInHtml(cardElement) {
    cards.prepend(cardElement);
}

//создаем карточки из шаблона template
function createCard(element) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__heading').textContent = element.name;
    cardElement.querySelector('.card__image').style.backgroundImage = `url(${element.link})`;

    setListeners(cardElement);

    addCardInHtml(cardElement);
};

//функции-обработчики
function setListeners(item) {
    item.querySelector('.card__image').addEventListener('click', openPopupImage);
    item.querySelector('.card__dellete').addEventListener('click', cardDellete);
    item.querySelector('.card__like').addEventListener('click', cardLike);
};

//открытие попапа картинки
function openPopupImage(evt) {
    const card = evt.target.closest('.card');
    imagePopup.style.backgroundImage = evt.target.style.backgroundImage;
    imagePopupHeading.textContent = card.querySelector('.card__heading').textContent;
    openPopup(image);
};

// Удаление карточки
function cardDellete(evt) {
    evt.target.closest('.card').remove();
};

//лайк карточек
function cardLike(evt) {
    evt.target.classList.toggle('card__like_active');
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
    createCard(newElement);
    cardHeading.value = '';
    cardImageLink.value = '';
    closePopup(cardPopup);
};

//открытие попапа редактирование профиля
editInfoButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
    openPopup(popup);
});

//закрытие попапа профиля
InfoPopupCloseButton.addEventListener('click', () => {
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

render();

//создаем карточки из элементов,названия и фотографий выводим из массива
// function addCard(element) {
//     const cardElement = cardTemplate.content.cloneNode(true);
//     cardElement.querySelector('.card__heading').textContent = element.name;
//     cardElement.querySelector('.card__image').style.backgroundImage = `url(${element.link})`;
//     cardElement.querySelector('.card__image').addEventListener('click', (evt) => {
//         imagePopup.style.backgroundImage = evt.target.style.backgroundImage;
//         imagePopupHeading.textContent = element.name
//         openPopup(image);
//     });

//     // Удаление карточки
//     cardElement.querySelector('.card__dellete').addEventListener('click', (evt) => {
//         const card = evt.target.closest('.card');
//         card.remove();
//     });

//     //лайк карточек
//     cardElement.querySelector('.card__like').addEventListener('click', (evt) => {
//         evt.target.classList.toggle('card__like_active');
//     });

//     cards.prepend(cardElement);
// };
// initialCards.forEach(addCard);

//Добавляем в массив новые свойство новыми значениями
// cardForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const newCardTitle = cardHeading.value;
//     const newCardLink = cardImageLink.value;
//     const newElement = {
//         name: newCardTitle,
//         link: newCardLink,
//     };
//     addCard(newElement);
//     cardHeading.value = '';
//     cardImageLink.value = '';
//     closePopup(cardPopup);
// });