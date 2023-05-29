import React from 'react';
import Popup from './Popup';

import imgAuthorizationAccess from '../images/Authorization-access-allowed.svg'
import imgAuthorizationError from '../images/Authorization-error.svg'

function InfoTooltip({ isOpen, onClose, typeInfoTooltip }) {
  return (
    <Popup
      name='authorization'
      isOpen={isOpen}
      onClose={onClose}
      classContainer="container_type_authorization"
    >
      <img className="popup__authorization-img" src={typeInfoTooltip ? imgAuthorizationAccess : imgAuthorizationError} alt="Результат авторизации" />
      <p className="popup__title">{typeInfoTooltip ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</p>
    </Popup>
  )
}

export default InfoTooltip;