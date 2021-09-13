import dayjs from 'dayjs';
import {Types} from '../const';
import AbstractView from './abstract.js';

const createOfferName = (offer = {}) => {
  let offerName = '';
  switch (offer.title) {
    case 'Add luggage':
      offerName = 'luggage';
      break;
    case 'Switch to comfort':
      offerName = 'comfort';
      break;
    case 'Add meal':
      offerName = 'meal';
      break;
    case 'Choose seats':
      offerName = 'seats';
      break;
    case 'Travel by train':
      offerName = 'train';
      break;
    default:
      offerName = '';
  }

  return offerName;
};

const createEventOfferSelector = (event = {}) => {
  const {offers} = event;

  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferName(offer)}-1" type="checkbox" name="event-offer-${createOfferName(offer)}" checked>
      <label class="event__offer-label" for="event-offer-${createOfferName(offer)}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
};

const createEventSectionOffers = (event) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEventOfferSelector(event)}
    </div>
  </section>`
);

const createEventTypeItem = (eventTypes) => {
  const types = Object.values(eventTypes);

  return types.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
        <label class="event__type-label  event__type-label--${type}" for="event-type-taxi-1">${type[0].toUpperCase() + type.substring(1)}</label>
    </div>`).join('');
};

const createPicturesItemTemplate = (event) => {
  const pictures = event.destination.pictures;
  console.log(pictures);
  return pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}"
      alt="${picture}">
    </img>`).join('');
};

const createPicturesContainerTemplate = (event) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPicturesItemTemplate(event)}
    </div>
  </div>`
);

const createEventSectionDestination = (event, isPictures) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${event.destination.description}</p>
    ${isPictures ? createPicturesContainerTemplate(event) : ''}
  </section>`
);

const createEventEditTemplate = (data) => {
  const {type, destination, dateFrom, dateTo, basePrice, isOffers, isDestination, isPictures} = data;

  // console.log(data)
  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createEventTypeItem(Types)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
        <datalist id="destination-list-1">
          <option value="Amsterdam"></option>
          <option value="Geneva"></option>
          <option value="Chamonix"></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${isOffers ? createEventSectionOffers(data) : ''}
      ${isDestination ? createEventSectionDestination(data, isPictures) : ''}
    </section>
  </form>`;
};

export default class EventEdit extends AbstractView {
  constructor(event) {
    super();
    // this._event = event;
    this._data = EventEdit.parseEventToData(event);

    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListener он теряет контекст (this),
    // а с контекстом - доступ к свойствам и методам.
    // Чтобы такого не происходило, нужно насильно
    // привязать обработчик к контексту с помощью bind
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    // 3. А внутри абстрактного обработчика вызовем колбэк
    this._callback.formSubmit(this._event);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setFormSubmitHandler(callback) {
    // Мы могли бы сразу передать callback в addEventListener,
    // но тогда бы для удаления обработчика в будущем,
    // нам нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setFormSubmitHandler, что не всегда удобно

    // 1. Поэтому колбэк мы запишем во внутреннее свойство
    this._callback.formSubmit = callback;
    // 2. В addEventListener передадим абстрактный обработчик
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeButtonClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
      {},
      event,
      {
        // isDueDate: task.dueDate !== null,
        // isRepeating: isTaskRepeating(task.repeating),
        isOffers: event.offers.length > 0,
        isDestination: event.destination,
        isPictures: event.destination.pictures.length > 0,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    // if (!data.isDueDate) {
    //   data.dueDate = null;
    // }

    // if (!data.isRepeating) {
    //   data.repeating = {
    //     mo: false,
    //     tu: false,
    //     we: false,
    //     th: false,
    //     fr: false,
    //     sa: false,
    //     su: false,
    //   };
    // }

    delete data.isOffers;
    delete data.isDestination;
    delete data.isPictures;

    return data;
  }
}
