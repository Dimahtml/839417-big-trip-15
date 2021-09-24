import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointsListView from '../view/points-list.js';
import NoPointView from '../view/no-point.js';
import LoadingView from '../view/loading.js';
import PointPresenter, {State as PointPresenterViewState} from './point.js';
import PointNewPresenter from './point-new.js';
import {filter} from '../utils/filter.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortTime, sortPrice} from '../utils/point.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';


export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, offersModel, destinationsModel, api) {
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._noPointComponent = null;

    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._pointsListComponent = new PointsListView();
    this._sortComponent = new SortView();
    this._noPointComponent = new NoPointView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pointNewPresenter = new PointNewPresenter(this._pointsListComponent, this._handleViewAction);
  }

  init() {
    this._renderSort();
    this._renderTrip();

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  destroy() {
    this._currentSortType = SortType.DEFAULT;
    this._clearPointList({resetRenderedPointCount: true, resetSortType: true});

    remove(this._pointsListComponent);
    remove(this._sortComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this._pointNewPresenter.init(this._offers, this._destinations, callback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filtredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filtredPoints.sort(sortTime);
      case SortType.PRICE:
        return filtredPoints.sort(sortPrice);
    }

    return filtredPoints;
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data, this._offers, this._destinations);
        break;
      case UpdateType.MINOR:
        this._clearPointList();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearPointList({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearPointList({resetSortType: true});
    this._renderTrip();
  }

  _renderSort() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    this._offers = this._offersModel.getOffers();
    this._destinations = this._destinationsModel.getDestinations();

    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, this._offers, this._destinations);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderNoPoint() {
    this._noPointComponent = new NoPointView(this._filterType);
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._tripContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoint();
      return;
    }
    render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
    points.forEach((point) =>  this._renderPoint(point));
  }

  _clearPointList() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._loadingComponent);

    if (this._noPointComponent) {
      remove(this._noPointComponent);
    }
  }
}
