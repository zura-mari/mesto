let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let popupCloseButton = popup.querySelector('.popup__close-button');
let nameInput = document.querySelector('.popup__text_type_name');
let aboutInput = document.querySelector('.popup__text_type_about');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

function editInfo() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    aboutInput.value = profileSubtitle.textContent;
}
editButton.addEventListener('click', editInfo);

function popupClose(){
    popup.classList.remove('popup_opened');
}
popupCloseButton.addEventListener('click', popupClose)


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = aboutInput.value;
    popupClose();
}
popupContainer.addEventListener('submit', formSubmitHandler);





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