import {FilterType} from '../const';

const currentDate = Date.now();

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => point.dateFrom >= currentDate),
  [FilterType.PAST]: (points) => points.filter((point) => point.dateTo <= currentDate),
};
