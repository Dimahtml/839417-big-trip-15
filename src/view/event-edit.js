import dayjs from 'dayjs';
import {getOffersByType} from '../utils/event.js';
import {Types} from '../const.js';
import {generateOffers} from '../mock/offer.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

// Три функции для отрисовки блока OFFERS
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
    case 'Choose the radio station':
      offerName = 'radiostation';
      break;
    case 'Upgrade to a business class':
      offerName = 'businessclass';
      break;
    default:
      offerName = 'default';
  }

  return offerName;
};

const createEventOfferSelector = (event = {}) => {
  const potentialOffers = generateOffers(event.type);
  const currentOffersTitles = event.offers.map((item) => item.title);
  // const potentialOffersTitles = potentialOffers.offers.map((item) => item.title);

  return potentialOffers.offers.map((offer) => {
    let isChecked = false;
    if (currentOffersTitles.includes(offer.title)) {
      isChecked = true;
    }
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferName(offer)}-1" type="checkbox" name="event-offer-${createOfferName(offer)}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${createOfferName(offer)}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
};

const createEventSectionOffers = (data) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEventOfferSelector(data)}
    </div>
  </section>`
);
// Функция отрисовки одного элемента ТИП ПОЕЗДКИ
const createEventTypeItem = (eventTypes) => {
  const types = Object.values(eventTypes);

  return types.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type[0].toUpperCase() + type.substring(1)}</label>
    </div>`).join('');
};
// Три функции для отрисовки блока DESTINATION
const createPicturesItemTemplate = (event) => {
  const pictures = event.destination.pictures;
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
// функция для отрисовки всей формы EVENT EDIT
const createEventEditTemplate = (data) => {
  const {type, destination, dateFrom, dateTo, basePrice, isOffers, isDestination, isPictures} = data;
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

export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._data = EventEdit.parseEventToData(event);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);

    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._basePriceChangeHandler = this._basePriceChangeHandler.bind(this);
    this._offerChangeCheckboxHandler = this._offerChangeCheckboxHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(
      EventEdit.parseEventToData(event),
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
  }

  _setInnerHandlers() {
    //навешиваем обработчики на чекбоксы-офферы
    if (this._data.isOffers) {
      const offersCheckboxes = this.getElement().querySelectorAll('.event__offer-checkbox');
      offersCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', this._offerChangeCheckboxHandler));
    }
    this.getElement()
      .querySelectorAll('.event__type-group input[type="radio"]')
      .forEach((input) => input.addEventListener('change', this._typeToggleHandler));
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._destinationChangeHandler);
    this.getElement()
      .querySelector('input[name="event-start-time"]')
      .addEventListener('change', this._dateFromChangeHandler);
    this.getElement()
      .querySelector('input[name="event-end-time"]')
      .addEventListener('change', this._dateToChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._basePriceChangeHandler);
  }

  _offerChangeCheckboxHandler(evt) {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');

    const checkedOffers = document.querySelectorAll('.event__offer-checkbox:checked');
    const resultOffers = [];

    checkedOffers.forEach((input) => {
      const contentTitle = input.nextElementSibling.querySelector('.event__offer-title').textContent;
      const contentPrice = input.nextElementSibling.querySelector('.event__offer-price').textContent;
      resultOffers.push({
        title: contentTitle,
        price: Number(contentPrice),
      });
    });

    this.updateData({
      offers: resultOffers,
    });
  }

  _typeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: {
        description: this._data.destination.description,
        name: evt.target.value, pictures:
        this._data.destination.pictures,
      },
    }, true);
  }

  _dateFromChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateFrom: evt.target.value,
    }, true);
  }

  _dateToChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateTo: evt.target.value,
    }, true);
  }

  _basePriceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basePrice: evt.target.value,
    }, true);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._closeButtonClickHandler);
  }

  static parseEventToData(event) {
    const potentialOffers = getOffersByType(event.type);
    return Object.assign(
      {},
      event,
      {
        isOffers: potentialOffers.length > 0,
        isDestination: event.destination !== null,
        isPictures: event.destination.pictures.length > 0,
      },
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDestination;
    delete data.isPictures;

    return data;
  }
}
