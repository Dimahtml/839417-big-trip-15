import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
// import {generatePoint} from './mock/point.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {MenuItem} from './const.js';
import {points} from '../src/mock/point.js';

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const pageMainContainerElement = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const addNewPointElement = document.querySelector('.trip-main__event-add-btn');
const siteMenuComponent = new SiteMenuView();
// const statisticsComponent = new StatisticsView(points);

render(siteMenuElement, siteMenuComponent, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterElement, filterModel, pointsModel);
let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.getElement().querySelector('#site-menu-table').classList.add('trip-tabs__btn--active');
      siteMenuComponent.getElement().querySelector('#site-menu-stats').classList.remove('trip-tabs__btn--active');
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      siteMenuComponent.getElement().querySelector('#site-menu-stats').classList.add('trip-tabs__btn--active');
      siteMenuComponent.getElement().querySelector('#site-menu-table').classList.remove('trip-tabs__btn--active');
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView(points);
      render(pageMainContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

addNewPointElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

filterPresenter.init();
tripPresenter.init();
