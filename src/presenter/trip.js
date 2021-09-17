import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';
import PointsListView from '../view/points-list.js';
import NoPointView from '../view/no-point.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

import {sortTime, sortPrice} from '../utils/point.js';
import {SortType} from '../const.js';

export default class Trip {
  constructor(tripContainer, pointsModel) {
    this._pointsModel = pointsModel;
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._siteMenuComponent = new SiteMenuView();
    this._filterComponent = new FilterView();
    this._pointsListComponent = new PointsListView();
    this._sortComponent = new SortView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints) {
    this._tripPoints = tripPoints.slice();
    this._sourcedTripEvents = tripPoints.slice();

    this._renderTrip();
  }

  _getPoints() {
    return this._pointsModel.getPoints();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._sourcedTripEvents = updateItem(this._sourcedTripEvents, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _sortPoints(sortType) {
    this._currentSortType = sortType;

    switch (this._currentSortType) {
      case SortType.TIME:
        this._tripPoints.sort(sortTime);
        break;
      case SortType.PRICE:
        this._tripPoints.sort(sortPrice);
        break;
      default:
        this._tripPoints = this._sourcedTripEvents.slice();
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderTrip();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderNoPoint() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripPoints.length > 0) {
      this._renderSort();
      render(this._tripContainer, this._pointsListComponent, RenderPosition.BEFOREEND);
      this._tripPoints.forEach((event) =>  this._renderPoint(event));
    } else {
      this._renderNoPoint();
    }
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }
}
