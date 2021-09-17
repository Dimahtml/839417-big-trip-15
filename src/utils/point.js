import dayjs from 'dayjs';

export const sortPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortTime = (pointA, pointB) => {
  const durationA = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const durationB = dayjs(pointB.dateTo).diff(pointB.dateFrom);
  return durationB - durationA;
};

export const getOffersByType = (type) => {
  let offers = [];
  switch (type) {
    case 'taxi':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Choose the radio station', price: 60}];
      break;
    case 'bus':
      offers = [{title: 'Choose seats', price: 120}];
      break;
    case 'train':
      offers = [{title: 'Add meal', price: 120},
        {title: 'Switch to comfort', price: 120},
        {title: 'Add luggage', price: 60}];
      break;
    case 'ship':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Switch to comfort', price: 60}];
      break;
    case 'transport':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Choose the radio station', price: 60}];
      break;
    case 'drive':
      offers = [];
      break;
    case 'flight':
      offers = [{title: 'Upgrade to a business class', price: 120},
        {title: 'Switch to comfort', price: 120},
        {title: 'Choose seats', price: 120},
        {title: 'Add luggage', price: 120},
        {title: 'Travel by train', price: 60 }];
      break;
    case 'check-in':
      offers = [{title: 'Upgrade to a business class', price: 120}];
      break;
    case 'sightseeing':
      offers = [];
      break;
    case 'restaurant':
      offers = [];
      break;
    default:
      offers = [];
  }
  return offers;
};

export const isDatesEqual = (dateA, dateB) => ((dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D'));

export const calculateDuration = (point) => point.dateFrom - point.dateTo;
