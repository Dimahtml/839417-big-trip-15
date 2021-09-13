import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import EventsListView from '../view/events-list.js';
import NoEventView from '../view/no-event.js';
import EventPresenter from './event.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

import {sortTime, sortPrice} from '../utils/event.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._eventPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._eventsListComponent = new EventsListView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    this._renderTrip();
  }

  _handleModeChange() {
    this._eventPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedEvent);
    this._eventPresenter.get(updatedEvent.id).init(updatedEvent);
  }

  _sortEvents(sortType) {
    this._currentSortType = sortType;

    switch (this._currentSortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortPrice);
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearEventList();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventsListComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter.set(event.id, eventPresenter);
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripEvents.length > 0) {
      this._renderSort();
      render(this._tripContainer, this._eventsListComponent, RenderPosition.BEFOREEND);
      this._tripEvents.forEach((event) =>  this._renderEvent(event));
    } else {
      this._renderNoEvents();
    }
  }

  _clearEventList() {
    this._eventPresenter.forEach((presenter) => presenter.destroy());
    this._eventPresenter.clear();
  }
}
