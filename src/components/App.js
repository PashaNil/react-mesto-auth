import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  // Открытие попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  // Отображение картинки при клике
  const [selectedCard, setSelectedCard] = React.useState(null)

  // Стейт обьекта данных пользователя, связан с контекстом
  const [currentUser, setCurrentUser] = React.useState({})

  // Стейт с массивом карточек с сервера
  const [cards, setCards] = React.useState([]);

  // Получение данных пользователя от сервера
  React.useEffect(() => {
    api.getSelfData()
      .then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }, [])

  // Запрос карточек с сервера, сохраняет в стейт cards
  React.useEffect(() => {

    api.getInitialCards()
      .then((dataCards) => {
        setCards(dataCards)
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });

  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(null)
  }

  // Обработчик нажатия на лайк
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

    //Обработчик события при клике на картинку
    function handleCardClick(card) {
      setSelectedCard(card)
    }

  // Удаление карточки
  function handleCardDelete(card) {
    // Отправляем запрос API на удаление карточки
    api.deletCard(card._id)
      .then(() => {
        setCards((cardsArr) => cardsArr.filter((item) => {
          return item === card ? item = null : item
        }))
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  // Обновление данных профайла пользователя на сервере
  function handleUpdateUser(profileData) {
    api.updateProfile(profileData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  // Обновление данных аватара пользователя на сервере
  function handleUpdateAvatar(avatarData) {
    api.updateAvatar(avatarData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка запроса: ${err}`)
      });
  }

  function handleAddPlaceSubmit(cardData){
    api.addNewCard(cardData)
    .then((newCard)=>{
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка запроса: ${err}`)
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            button="Да"
            onClose={closeAllPopups}
          >
          </PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />

        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
