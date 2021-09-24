import dayjs from 'dayjs';
import AbstractView from './abstract.js';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

const getFormattedDuration = (minutes) => {
  const minutesInHour = 60;
  const minutesInDay = 1440;
  let diffFormatted = '';
  if (minutes < minutesInHour) {
    diffFormatted = dayjs.duration(minutes, 'minutes').format('mm[M]');
  } else if (minutes < minutesInDay && minutes >= minutesInHour) {
    diffFormatted = dayjs.duration(minutes, 'minutes').format('HH[H] mm[M]');
  } else if (minutes >= minutesInDay) {
    diffFormatted = dayjs.duration(minutes, 'minutes').format('DD[D] HH[H] mm[M]');
  }

  return diffFormatted;
};

const createPointOffer = (point = {}) => {
  const checkedOffers = point.offers;

  return checkedOffers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');
};

const createPointFavoriteIcon = (isFavorite = false) => (
  `<button class="event__favorite-btn ${isFavorite === true ? 'event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`
);

const createPointTemplate = (point) => {
  const {dateFrom, dateTo, basePrice} = point;
  const month = dayjs(dateFrom).format('MMM DD');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');
  const diff = dayjs(dateTo).diff(dateFrom, 'minute');
  const durationFormatted = getFormattedDuration(diff);

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${month}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type} ${point.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${endTime}</time>
        </p>
        <p class="event__duration">${durationFormatted}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createPointOffer(point)}
      </ul>
      ${createPointFavoriteIcon(point.isFavorite)}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView {
  constructor(point, offers) {
    super();
    this._point = point;
    this._potentialOffers = offers;

    this._openButtonClickHandler = this._openButtonClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _openButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.openButtonClick();
  }

  setOpenButtonClickHandler(callback) {
    this._callback.openButtonClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._openButtonClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-btn').addEventListener('click', this._favoriteClickHandler);
  }
}
