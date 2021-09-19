import SiteMenuView from './view/site-menu.js';
import StatisticsView from './view/statistics.js';
import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter.js';
import PointsModel from './model/points.js';
import FilterModel from './model/filter.js';
import {remove, render, RenderPosition} from './utils/render.js';
import {MenuItem} from './const.js';
import {points as mockPoints} from '../src/mock/point.js';

const pointsModel = new PointsModel();
pointsModel.setPoints(mockPoints);

const filterModel = new FilterModel();

const pageMainContainerElement = document.querySelector('.page-body__page-main').querySelector('.page-body__container');

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const addNewPointElement = document.querySelector('.trip-main__event-add-btn');
const siteMenuComponent = new SiteMenuView();
import Api from './api.js';

const AUTHORIZATION = 'Basic qwerjfaskdlfftiye';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

api.getPoints().then((points) => {
  console.log(points);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

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
      statisticsComponent = new StatisticsView(mockPoints);
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
