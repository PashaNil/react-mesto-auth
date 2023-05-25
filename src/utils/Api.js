class Api {
  constructor(configApi) {
    this._url = configApi.url
    this._headers = configApi.headers
  }

  //Шаблон запроса к серверу с ответом
  _request(url, data = {}) {
    return fetch(url, {
      ...data,
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Запрос выполнен. Код: ${res.status} `)
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Получение карточек от сервера
  getInitialCards() {
    const url = this._url + "/cards"
    return this._request(url)
  }

  // Получение информации о себе
  getSelfData() {
    const url = this._url + "/users/me";
    return this._request(url)
  }

  // Создание новой карточки
  addNewCard(cardData) {
    const url = this._url + "/cards";
    return this._request(url, {
      method: "POST",
      body: JSON.stringify(cardData)
    })
  }

  // Обновление данных профиля на сервере
  updateProfile(profileData) {
    const url = this._url + "/users/me"
    return this._request(url, {
      method: "PATCH",
      body: JSON.stringify(profileData)
    })
  }

  //Обновление аватара
  updateAvatar(avatarData) {
    const url = this._url + "/users/me/avatar";
    return this._request(url, {
      method: "PATCH",
      body: JSON.stringify(avatarData)
    })
  }

/*   // Обновление данных лайка на сервере
  addLikeNumber(cardId) {
    const url = this._url + `/cards/${cardId}/likes`
    return this._request(url, {
      method: "PUT"
    })
  } */

/*   // Удаление лайка
  deletLikeNumber(cardId) {
    const url = this._url + `/cards/${cardId}/likes`
    return this._request(url, {
      method: "DELETE"
    })
  } */

  // Обновление данных лайка
  changeLikeCardStatus(cardId, isLiked){
    const likeMethod = isLiked ? "DELETE" : "PUT";
    const url = this._url + `/cards/${cardId}/likes`
    return this._request(url, {
      method: likeMethod
    })
  }

  // Удаление карточки
  deletCard(cardId) {
    const url = this._url + `/cards/${cardId}`
    return this._request(url, {
      method: "DELETE"
    })
  }

}

const apiConfig = {
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "f851a28e-3c06-4143-b5cd-2ea04e3b1b00",
    "Content-Type": "application/json",
  },
};

const api  = new Api(apiConfig);
export default api;
