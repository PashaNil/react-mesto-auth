import React from 'react';

function PopupWithForm(props) {

  // Обработчик закрытия попапов по оверлею
  function closePopupOverlay(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      props.onClose();
    }
  }

  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
      onClick={closePopupOverlay}>
      <div className="popup__container">
        <button
          className="popup__close-icon opacity-hover"
          type="button"
          aria-label="Закрытие окна"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className={`popup__form popup__form_type_${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
          <fieldset className="popup__fieldset">
            {props.children}
          </fieldset>
          <button className="popup__button" type="submit" aria-label="Сохранить форму"
          >{props.button}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
