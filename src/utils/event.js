import dayjs from 'dayjs';

export const sortPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export const sortTime = (eventA, eventB) => {
  const durationA = dayjs(eventA.dateTo).diff(eventA.dateFrom);
  const durationB = dayjs(eventB.dateTo).diff(eventB.dateFrom);
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
