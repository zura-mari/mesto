let profile = document.querySelector('.profile');
let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let popup = document.querySelector('.popup');
let popupOpend = popup.querySelector('.popup_opened');
let popupCloseButton = popup.querySelector('.popup__close-button');
let popupSaveButton = popup.querySelector('.popup__save-button');
let cardContainer = document.querySelector('.card__container');
let cardsSection = document.querySelector('.cards__section');
let cardLikeButton = cardContainer.querySelector('.card__like');
let popupContainer = document.querySelector('.popup__container');

editButton.addEventListener('click', function () {
    popup.classList.remove('popup_opened');
});

popupCloseButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
});

popupContainer.addEventListener('click', function (evt) {
    evt.preventDefault();
});


function formSubmitHandler(evt) {
    evt.preventDefault();
    let nameInput = document.querySelector('.popup__text_type_name');
    let aboutInput = document.querySelector('.popup__text_type_about');
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;


}

popupSaveButton.addEventListener('click', formSubmitHandler);
popupSaveButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('popup_opened');
});




// function addCard() {
//     cardsSection.insertAdjacentHTML ('afterbegin',
//     `<div class="card">
//         <div class="card__image" style="background-image: url(./images/Тбилиси.jpg)"></div>
//         <div class="card__container">
//           <h3 class="card__heading">Тбилиси</h3>
//           <button class="card__like card__like_active"></button>
//         </div>
//       </div>`);
// }
// addButton.addEventListener('click', addCard);