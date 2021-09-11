import SortView from './view/sort.js';
import TripView from './view/trip.js';
import EventView from './view/event.js';
import EventEditView from './view/event-edit';
import NoEventView from './view/no-event.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripComponent = new TripView();
    this._sortComponent = new SortView();
    this._noEventComponent = new NoEventView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    // Метод для инициализации (начала работы) модуля,
    // малая часть текущей функции renderBoard в main.js
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEvents() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
