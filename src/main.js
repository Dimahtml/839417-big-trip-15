import SiteMenuView from './view/site-menu.js';
import FilterView from './view/filter.js';

import TripPresenter from './presenter/trip.js';

import {generateEvent} from './mock/event.js';
import {render, RenderPosition} from './utils/render.js';

const EVENT_COUNT = 10;

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteMenuElement = document.querySelector('.trip-controls__navigation');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(siteMenuElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
render(siteFilterElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripEventsElement);
tripPresenter.init(events);
