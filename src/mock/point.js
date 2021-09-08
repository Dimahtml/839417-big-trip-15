import dayjs from 'dayjs';
import {generateOffers} from './offer';
import {generateDestination} from './destination';

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateType = () => {
  const types = [
    'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant',
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const generateDate = () => {
  const maxMinutesGap = 14400;
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const dateFrom = dayjs().add(minutesGap, 'minute');
  const dateTo = dateFrom.add(30, 'minute');

  return {
    dateFrom: dateFrom.toDate(),
    dateTo: dateTo.toDate(),
  };
};

const generateBasePrice = () => getRandomInteger(1, 50) * 10;

export const generatePoint = () => {
  const {dateFrom, dateTo} = generateDate();
  const {offers} = generateOffers();
  const type = generateType();

  return {
    basePrice: generateBasePrice(),
    dateFrom,
    dateTo,
    destination: generateDestination(),
    id: 0,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers,
    type,
  };
};
