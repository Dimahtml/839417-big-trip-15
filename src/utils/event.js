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
    case 'Taxi':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Choose the radio station', price: 60}];
      break;
    case 'Bus':
      offers = [{title: 'Choose seats', price: 120}];
      break;
    case 'Train':
      offers = [{title: 'Add meal', price: 120},
        {title: 'Switch to comfort', price: 120},
        {title: 'Add luggage', price: 60}];
      break;
    case 'Ship':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Switch to comfort', price: 60}];
      break;
    case 'Transport':
      offers = [{title: 'Upgrade to a business class',price: 120},
        {title: 'Choose the radio station', price: 60}];
      break;
    case 'Drive':
      offers = [];
      break;
    case 'Flight':
      offers = [{title: 'Upgrade to a business class', price: 120},
        {title: 'Switch to comfort', price: 120},
        {title: 'Choose seats', price: 120},
        {title: 'Add luggage', price: 120},
        {title: 'Travel by train', price: 60 }];
      break;
    case 'Check-in':
      offers = [{title: 'Upgrade to a business class', price: 120}];
      break;
    case 'Sightseeing':
      offers = [];
      break;
    case 'Restaurant':
      offers = [];
      break;
    default:
      offers = [];
  }
  return offers;
};
