import SmartView from './smart.js';

const createStatisticsTemplate = () => (
  `<section class="statistics">
    <h2>Trip statistics</h2>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>

    <div class="statistics__item">
      <canvas class="statistics__chart" id="time-spend" width="900"></canvas>
    </div>
  </section>`
);

export default class Stats extends SmartView {
  constructor(points) {
    super();

    this._data = {
      points,
    };
  }

  getTemplate() {
    return createStatisticsTemplate();
  }
}

removeElement() {
  super.removeElement();

  if (this._datepicker) {
    this._datepicker.destroy();
    this._datepicker = null;
  }
}
