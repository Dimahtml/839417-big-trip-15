import {getRandomInteger} from '../utils/common.js';
import {Types, OFFERS_BY_TYPES} from '../const.js';

const generateOffer = () => {
  const titles = [
    'Add luggage', 'Switch to comfort', 'Add meal', 'Choose seats', 'Travel by train',
  ];

  const prices = [
    5, 15, 30, 40, 50, 80, 100,
  ];

  return {
    title: titles[getRandomInteger(0, titles.length - 1)],
    price: prices[getRandomInteger(0, prices.length - 1)],
  };
};

// export const generateOffers = (type) => {
//   const offersCount = getRandomInteger(0, 5);
//   return {
//     type,
//     offers: new Array(offersCount).fill().map(generateOffer),
//   };
// };

export const generateOffers = (type) => {
  let offers = [];
  switch (type) {
    case Types.TAXI:
      offers = OFFERS_BY_TYPES.TAXI;
      break;
    case Types.BUS:
      offers = OFFERS_BY_TYPES.BUS;
      break;
    case Types.TRAIN:
      offers = OFFERS_BY_TYPES.TRAIN;
      break;
    case Types.SHIP:
      offers = OFFERS_BY_TYPES.SHIP;
      break;
    case Types.DRIVE:
      offers = OFFERS_BY_TYPES.DRIVE;
      break;
    case Types.FLIGHT:
      offers = OFFERS_BY_TYPES.FLIGHT;
      break;
    case Types.CHECKIN:
      offers = OFFERS_BY_TYPES.CHECKIN;
      break;
    case Types.SIGHTSEEING:
      offers = OFFERS_BY_TYPES.SIGHTSEEING;
      break;
    case Types.RESTARAUNT:
      offers = OFFERS_BY_TYPES.RESTAURANT;
      break;
    default:
      offers = [];
  }

  return {
    type,
    offers,
  };
};
