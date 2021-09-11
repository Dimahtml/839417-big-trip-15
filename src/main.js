import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';
import TripPresenter from './presenter/trip.js';
import {generateEvent} from './mock/event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 3;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(siteMenuElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(events);
