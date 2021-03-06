import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offers.js';
import DestinationModel from './model/destination.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {MenuItem, UpdateType} from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic qwerjfaskdlfftiye';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const pageMainContainerElement = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const addNewPointElement = document.querySelector('.trip-main__event-add-btn');

addNewPointElement.disabled = true;

const siteMenuComponent = new SiteMenuView();

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationModel();

const api = new Api(END_POINT, AUTHORIZATION);

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel, offersModel, destinationsModel, api);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE: {
      siteMenuComponent.getElement().querySelector('#site-menu-table').classList.add('trip-tabs__btn--active');
      siteMenuComponent.getElement().querySelector('#site-menu-stats').classList.remove('trip-tabs__btn--active');
      document.querySelectorAll('.trip-filters__filter-input').forEach((filter) => filter.disabled = false);
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      addNewPointElement.disabled = false;
      break;
    }
    case MenuItem.STATS: {
      addNewPointElement.disabled = true;
      siteMenuComponent.getElement().querySelector('#site-menu-stats').classList.add('trip-tabs__btn--active');
      siteMenuComponent.getElement().querySelector('#site-menu-table').classList.remove('trip-tabs__btn--active');
      document.querySelectorAll('.trip-filters__filter-input').forEach((filter) => filter.disabled = true);
      tripPresenter.destroy();

      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      render(pageMainContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    }
  }
};

const handlePointNewFormClose = () => {
  addNewPointElement.disabled = false;
};

addNewPointElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  addNewPointElement.disabled = true;
  tripPresenter.createPoint(handlePointNewFormClose);
});

filterPresenter.init();
tripPresenter.init();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints(),
])
  .then((data) => {
    const [destinations, offers, points] = data;
    addNewPointElement.disabled = false;
    destinationsModel.setDestinations(UpdateType.INIT, destinations);
    offersModel.setOffers(UpdateType.INIT, offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
