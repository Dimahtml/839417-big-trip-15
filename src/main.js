import {createTripInfoTemplate} from './view/trip-info.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createFilterTemplate} from './view/filter.js';
import SortView from './view/sort.js';
import {createEventsListTemplate} from './view/events-list-container.js';
import {createEventTemplate} from './view/event.js';
import {createTotalPriceTemplate} from './view/total-price.js';
import {createEventEditTemplate} from './view/event-edit.js';
import {createNoEventTemplate} from './view/no-event.js';
import {generateEvent} from './mock/event.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const tripMainElement = document.querySelector('.trip-main');
const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderTemplate(siteMenuElement, createSiteMenuTemplate());
renderTemplate(siteFilterElement, createFilterTemplate());

if (events.length === 0) {
  renderTemplate(tripEventsElement, createNoEventTemplate());
} else {
  renderTemplate(tripMainElement, createTripInfoTemplate(), 'afterbegin');
  renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  renderTemplate(tripEventsElement, createEventsListTemplate());

  const eventsList = document.querySelector('.trip-events__list');
  const tripInfoElement = document.querySelector('.trip-main__trip-info');

  for (let i = 1; i < EVENT_COUNT; i++) {
    renderTemplate(eventsList, createEventTemplate(events[i]));
  }

  renderTemplate(tripInfoElement, createTotalPriceTemplate());
  renderTemplate(eventsList, createEventEditTemplate(events[0]), 'afterbegin');
}
