import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import EventsContainer from './view/events-list-container.js';
import {createEventTemplate} from './view/event.js';
import {createEventEditTemplate} from './view/event-edit.js';
import NoEventView from './view/no-event.js';
import {generateEvent} from './mock/event.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

renderElement(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  renderElement(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, new EventsContainer().getElement(), RenderPosition.BEFOREEND);

  const eventsList = document.querySelector('.trip-events__list');

  for (let i = 1; i < EVENT_COUNT; i++) {
    renderTemplate(eventsList, createEventTemplate(events[i]));
  }

  renderTemplate(eventsList, createEventEditTemplate(events[0]), 'afterbegin');
}
