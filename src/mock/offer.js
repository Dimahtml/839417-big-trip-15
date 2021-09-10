import {getRandomInteger} from '../utils/common.js';

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

export const generateOffers = (type) => {
  const offersCount = getRandomInteger(0, 5);
  return {
    type,
    offers: new Array(offersCount).fill().map(generateOffer),
  };
};
