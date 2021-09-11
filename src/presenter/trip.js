import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import NoEventView from '../view/no-event.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._eventsListComponent = new EventsListView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
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

    eventComponent.setOpenButtonClickHandler(() => {
      openPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setCloseButtonClickHandler(() => {
      closePoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      closePoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._eventsListComponent, eventComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    if (this._tripEvents.length > 0) {
      this._renderSort();
      render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
      // const eventsList = document.querySelector('.trip-events__list');
      this._tripEvents.forEach((event) =>  this._renderEvent(event));
    } else {
      this._renderNoEvents();
    }
  }
}
