import dayjs from 'dayjs';

export const sortTime = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export const sortPrice = (eventA, eventB) => {
  const durationA = dayjs(eventA.dateTo).diff(eventA.dateFrom);
  const durationB = dayjs(eventB.dateTo).diff(eventB.dateFrom);
  return durationB - durationA;
};
