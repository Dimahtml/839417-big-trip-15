import {createTripInfoTemplate} from './view/trip-info.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector('.trip-main');

render(tripMainElement, createTripInfoTemplate(), 'beforeend');
