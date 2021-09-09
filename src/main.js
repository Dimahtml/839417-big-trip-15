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

  const openPoint = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const closePoint = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      closePoint();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    openPoint();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    closePoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement().querySelector('.event__save-btn').addEventListener('submit', (evt) => {
    evt.preventDefault();
    closePoint();
    document.removeEventListener('keydown', onEscKeyDown);
  });

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
    renderEvent(eventsList, events[i]);
  }

  render(eventsList, new EventEditView(events[0]).getElement(), RenderPosition.AFTERBEGIN);
}
