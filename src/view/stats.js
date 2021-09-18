import AbstractView from './abstract.js';

const createStatsTemplate = () => (
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

export default class Stats extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createStatsTemplate();
  }
}
