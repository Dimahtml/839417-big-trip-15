import dayjs from 'dayjs';
import {generateOffers} from './offer.js';
import {generateDestination} from './destination.js';
import {getRandomInteger} from '../utils/common.js';
import {nanoid} from 'nanoid';

const generateType = () => {
  const types = [
    'taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDate = () => {
  const maxMinutesGap = 14400;
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const dateFrom = dayjs().add(minutesGap, 'minute');
  const diff = getRandomInteger(20, 50);
  const dateTo = dateFrom.add(diff, 'minute');

  return {
    dateFrom: dateFrom.toDate(),
    dateTo: dateTo.toDate(),
  };
};

const generateBasePrice = () => getRandomInteger(1, 50) * 10;

export const generatePoint = () => {
  const {dateFrom, dateTo} = generateDate();
  const type = generateType();
  const offers = generateOffers(type).offers;
  return {
    id: nanoid(),
    basePrice: generateBasePrice(),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
    type,
  };
};
