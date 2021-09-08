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

export const generatePoint = () => ({
  basePrice: 1100,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
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
});
