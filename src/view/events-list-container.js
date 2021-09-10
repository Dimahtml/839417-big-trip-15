import AbstractView from './abstract.js';

const createEventsContainerTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class EventsContainer extends AbstractView {
  getTemplate() {
    return createEventsContainerTemplate();
  }
}
