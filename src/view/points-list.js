import AbstractView from './abstract.js';

const createPointsContainerTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class Trip extends AbstractView {
  getTemplate() {
    return createPointsContainerTemplate();
  }
}
