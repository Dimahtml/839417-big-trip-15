import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

export const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const durationB = dayjs(pointB.dateTo).diff(pointB.dateFrom);
  return durationB - durationA;
};

export const sortDateFrom = (pointA, pointB) => pointB.dateFrom - pointA.dateFrom;

export const isDatesEqual = (dateA, dateB) => ((dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D'));
