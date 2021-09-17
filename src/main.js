import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import PointsModel from './model/points.js';
import {generatePoint} from './mock/point.js';
import {render, RenderPosition} from './utils/render.js';

const POINT_COUNT = 10;

const points = new Array(POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement, pointsModel);
tripPresenter.init();
