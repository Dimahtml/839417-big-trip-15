import {createTripInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortTemplate} from './view/sort.js';
import {createEventsListTemplate} from './view/events-list-container.js';
import {createEventTemplate} from './view/event.js';
import {createTotalPriceTemplate} from './view/total-price.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {generateEvent} from './mock/event.js';

const EVENT_COUNT = 3;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(tripMainElement, createTripInfoTemplate(), 'afterbegin');
render(siteMenuElement, createSiteMenuTemplate());
render(siteFilterElement, createFilterTemplate());
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createEventsListTemplate());

const eventsList = document.querySelector('.trip-events__list');
const tripInfoElement = document.querySelector('.trip-main__trip-info');

for (let i = 0; i < EVENT_COUNT; i++) {
  render(eventsList, createEventTemplate(events[i]));
}

render(tripInfoElement, createTotalPriceTemplate());
render(eventsList, createEventEditTemplate(), 'afterbegin');

console.log(events);
