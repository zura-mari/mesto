export {openPopup, closePopup};


//добавляем модификатор для открытие попапа карточки
function openPopup(profilePopup) {
    profilePopup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupWithEsc);
    document.addEventListener('mousedown', closePopupMousedown);
    cardForm.reset();
};

//удаляем модификатор для закрытие попапа профиля
function closePopup(profilePopup) {
    profilePopup.classList.remove('popup_opened');
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