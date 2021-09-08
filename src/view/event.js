import dayjs from 'dayjs';

const createEventOffer = (event = {}) => {
  const {offers} = event;

  return offers.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`).join('');
};

const createEventFavoriteIcon = (isFavorite = false) => (
  `<button class="event__favorite-btn ${isFavorite === true ? 'event__favorite-btn--active' : ''}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>`
);

export const createEventTemplate = (event) => {
  const {dateFrom, dateTo, basePrice} = event;
  const month = dayjs(dateFrom).format('MMM DD');
  const startTime = dayjs(dateFrom).format('HH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');
  const diff = dayjs(dateTo).diff(dateFrom, 'minute');

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${month}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${event.type} ${event.destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DDTHH:mm')}">${startTime}</time>
          &mdash;
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DDTHH:mm')}">${endTime}</time>
        </p>
        <p class="event__duration">${diff}M</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createEventOffer(event)}
      </ul>
      ${createEventFavoriteIcon(event.isFavorite)}
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};
