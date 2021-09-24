import dayjs from 'dayjs';
import {Types} from '../const.js';
import SmartView from './smart.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: Date.now(),
  dateTo: Date.now(),
  destination:
    {
      description: '',
      name: '',
      pictures: [],
    },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};
// Две функции для отрисовки блока OFFERS
const createEventOfferSelector = (point, allOffersForType, isDisabled) => {
  const currentOffersTitles = point.offers.map((item) => item.title);
  return allOffersForType.map((offer) => {
    let isChecked = false;
    if (currentOffersTitles.includes(offer.title)) {
      isChecked = true;
    }
    return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title}-1" type="checkbox"
        name="event-offer-${offer.title}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('');
};

const createEventSectionOffers = (point, allOffersForType, isDisabled) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createEventOfferSelector(point, allOffersForType, isDisabled)}
    </div>
  </section>`
);
// Функция отрисовки одного элемента ТИП ПОЕЗДКИ
const createEventTypeItem = (pointTypes, isDisabled) => {
  const types = Object.values(pointTypes);

  return types.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio"
        name="event-type" value="${type.toLowerCase()}" ${isDisabled ? 'disabled' : ''}>
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type[0].toUpperCase() + type.substring(1)}</label>
    </div>`).join('');
};
// Три функции для отрисовки блока DESTINATION
const createPicturesItemTemplate = (point) => {
  const pictures = point.destination.pictures;
  return pictures.map((picture) =>
    `<img class="event__photo" src="${picture.src}"
      alt="${picture}">
    </img>`).join('');
};

const createPicturesContainerTemplate = (point) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPicturesItemTemplate(point)}
    </div>
  </div>`
);

const createEventSectionDestination = (point, isPictures) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${point.destination.description}</p>
    ${isPictures ? createPicturesContainerTemplate(point) : ''}
  </section>`
);
// Функция для отрисовки вариантов городов
const createDestinationOptions = (destinations) => (
  destinations.map((destination) =>`<option value="${destination.name}"></option>`).join('')
);
// функция для отрисовки всей формы EVENT EDIT
const createPointEditTemplate = (point, allOffers, allDestinations) => {
  const {type, destination, dateFrom, dateTo, basePrice, isOffers, isDestination, isPictures, isDisabled, isSaving, isDeleting} = point;
  const destinationList = createDestinationOptions(allDestinations);
  const allOffersForType = allOffers.find((item) => item.type === type).offers;
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
            ${createEventTypeItem(Types, isDisabled)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text"
          name="event-destination" value="${destination.name}" list="destination-list-1" ${isDisabled ? 'disabled' : ''}>
        <datalist id="destination-list-1" required>
          ${destinationList}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text"
          name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text"
          name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
        ${isSaving ? 'Saving...' : 'Save'}
      </button>
      <button class="event__reset-btn" type="reset">
        ${isDeleting ? 'Deleting...' : 'Delete'}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${isOffers ? createEventSectionOffers(point, allOffersForType, isDisabled) : ''}
      ${isDestination ? createEventSectionDestination(point, isPictures) : ''}
    </section>
  </form>`;
};

export default class PointEdit extends SmartView {
  constructor(point = BLANK_POINT, allOffers, allDestinations) {
    super();
    this._point = point;
    this._allOffers = allOffers;
    this._allDestinations = allDestinations;
    this._data = PointEdit.parsePointToData(point, allOffers);
    this._datepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._typeToggleHandler = this._typeToggleHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._dateFromChangeHandler = this._dateFromChangeHandler.bind(this);
    this._dateToChangeHandler = this._dateToChangeHandler.bind(this);
    this._basePriceChangeHandler = this._basePriceChangeHandler.bind(this);
    this._offerChangeCheckboxHandler = this._offerChangeCheckboxHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(point, allOffers = this._allOffers) {
    this.updateData(
      PointEdit.parsePointToData(point, allOffers),
    );
  }

  getTemplate() {
    return createPointEditTemplate(this._data, this._allOffers, this._allDestinations);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._datepickerFrom) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerFrom.destroy();
      this._datepickerFrom = null;
    }

    if (this._datepickerTo) {
      this._datepickerTo.destroy();
      this._datepickerTo = null;
    }
    this._datepickerFrom = flatpickr(
      this.getElement().querySelector('input[name="event-start-time"]'),
      {
        // eslint-disable-next-line camelcase
        time_24hr: true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateFrom,
        maxDate: this._data.dateTo,
        onChange: this._dateFromChangeHandler,
      },
    );

    this._datepickerTo = flatpickr(
      this.getElement().querySelector('input[name="event-end-time"]'),
      {
        // eslint-disable-next-line camelcase
        time_24hr: true,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._data.dateTo,
        minDate: this._data.dateFrom,
        onChange: this._dateToChangeHandler,
      },
    );
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
      isOffers: true,
      type: evt.target.value,
      offers: this._allOffers.find((item) => item.type === evt.target.value).offers,
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const inputValue = evt.target.value;
    const cityList = this._allDestinations.map((destination) => destination.name);
    const isCityExist = cityList.includes(inputValue);

    if (inputValue.length <= 0 || isCityExist === false) {
      evt.target.setCustomValidity('please select a city from the list');
    } else {
      evt.target.setCustomValidity('');
      this.updateData(
        {isPictures: this._allDestinations.find((destination) => destination.name === inputValue).pictures.length > 0,
          destination: {
            description: this._allDestinations.find((destination) => destination.name === inputValue).description,
            name: inputValue,
            pictures: this._allDestinations.find((destination) => destination.name === inputValue).pictures,
          },
        },
      );
    }
    evt.target.reportValidity();
  }

  _dateFromChangeHandler([dateFrom]) {
    this.updateData({
      dateFrom: dateFrom,
    }, true);
  }

  _dateToChangeHandler([dateTo]) {
    this.updateData({
      dateTo: dateTo,
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
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  static parsePointToData(point, allOffers) {
    const potentialOffers = allOffers.find((item) => item.type === point.type).offers;
    return Object.assign(
      {},
      point,
      {
        isOffers: potentialOffers.length > 0,
        isDestination: point.destination !== null,
        isPictures: point.destination.pictures.length > 0,
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isOffers;
    delete data.isDestination;
    delete data.isPictures;
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
