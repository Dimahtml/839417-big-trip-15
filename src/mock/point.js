import dayjs from 'dayjs';

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

export const generateDate = () => {
  const maxMinutesGap = 14400;
  const minutesGap = getRandomInteger(-maxMinutesGap, maxMinutesGap);
  const dateFrom = dayjs().add(minutesGap, 'minute');
  const dateTo = dateFrom.add(30, 'minute');

  // console.log(dateFrom.format('MMM DD HH:mm'));
  // console.log(dateTo.format('MMM/DD/HH/mm'));
  // console.log(dateTo.toDate());

  return {
    dateFrom: dateFrom.toDate(),
    dateTo: dateTo.toDate(),
  };
};

export const generatePoint = () => {
  const {dateFrom, dateTo} = generateDate();

  return {
    basePrice: 1100,
    dateFrom,
    dateTo,
    destination: 'Destination',
    id: 0,
    isFavorite: false,
    offers: [
      {
        title: 'Choose meal',
        price: 180,
      },
      {
        title: 'Upgrade to comfort class',
        price: 50,
      },
    ],
    type: generateType(),
  };
};
