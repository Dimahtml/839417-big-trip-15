import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import SortView from './view/sort.js';
import EventsContainer from './view/events-list-container.js';
import EventView from './view/event.js';
import EventEditView from './view/event-edit';
import NoEventView from './view/no-event.js';
import {generateEvent} from './mock/event.js';
import {render, RenderPosition} from './utils.js';

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};


render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  render(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, new EventsContainer().getElement(), RenderPosition.BEFOREEND);

  const eventsList = document.querySelector('.trip-events__list');

  for (let i = 1; i < EVENT_COUNT; i++) {
    // render(eventsList, new EventView(events[i]).getElement(), RenderPosition.BEFOREEND);
    renderEvent(eventsList, events[i]);
  }

  render(eventsList, new EventEditView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
}
