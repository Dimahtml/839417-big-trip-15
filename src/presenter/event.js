import EventView from '../view/event.js';
import EventEditView from '../view/event-edit.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Event {
  constructor(eventsListContainer) {
    this._eventsListContainer = eventsListContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleOpenButtonClick = this._handleOpenButtonClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new EventView(event);
    this._eventEditComponent = new EventEditView(event);

    // this._eventComponent.setOpenButtonClickHandler(() => {
    //   this._rollUpPoint();
    //   document.addEventListener('keydown', this._onEscKeyDown);
    // });

    this._eventComponent.setOpenButtonClickHandler(this._handleOpenButtonClick);

    // this._eventEditComponent.setCloseButtonClickHandler(() => {
    //   this._rollDownPoint();
    //   document.removeEventListener('keydown', this._onEscKeyDown);
    // });

    this._eventEditComponent.setCloseButtonClickHandler(this._handleCloseButtonClick);

    this._eventEditComponent.setFormSubmitHandler(this._handleCloseButtonClick);

    render(this._eventsListContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _rollUpPoint() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _rollDownPoint() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  // _onEscKeyDown(evt) {
  //   if (evt.key === 'Escape' || evt.key === 'Esc') {
  //     evt.preventDefault();
  //     this._rollDownPoint();
  //     document.removeEventListener('keydown', this._onEscKeyDown);
  //   }
  // }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._rollDownPoint();
    }
  }

  _handleOpenButtonClick() {
    this._rollUpPoint();
  }

  _handleCloseButtonClick() {
    this._rollDownPoint();
  }

  // _handleFormSubmit() {
  //   this._rollDownPoint();
  // }
}
