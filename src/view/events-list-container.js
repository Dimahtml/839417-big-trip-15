import {createElement} from '../utils.js';

const createEventsContainerTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class EventsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventsContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
