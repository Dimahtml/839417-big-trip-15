export const Types = {
  TAXI: 'Taxi',
  BUS: 'Bus',
  TRAIN: 'Train',
  SHIP: 'Ship',
  TRANSPORT: 'Transport',
  DRIVE: 'Drive',
  FLIGHT: 'Flight',
  CHECKIN: 'Check-in',
  SIGHTSEEING: 'Sightseeing',
  RESTARAUNT: 'Restaurant',
};

export const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
  DISABLED: 'disabled',
};

export const OFFERS_BY_TYPES = {
  TAXI: [
    {
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      title: 'Choose the radio station',
      price: 60,
    }],
  BUS: [
    {
      title: 'Choose seats',
      price: 120,
    }],
  TRAIN: [
    {
      title: 'Add meal',
      price: 120,
    },
    {
      title: 'Switch to comfort',
      price: 120,
    },
    {
      title: 'Add luggage',
      price: 60,
    }],
  SHIP: [
    {
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      title: 'Switch to comfort',
      price: 60,
    }],
  TRANSPORT: [
    {
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      title: 'Choose the radio station',
      price: 60,
    }],
  DRIVE: [],
  FLIGHT: [
    {
      title: 'Upgrade to a business class',
      price: 120,
    },
    {
      title: 'Switch to comfort',
      price: 120,
    },
    {
      title: 'Choose seats',
      price: 120,
    },
    {
      title: 'Add luggage',
      price: 120,
    },
    {
      title: 'Travel by train',
      price: 60,
    }],
  CHECKIN: [
    {
      title: 'Upgrade to a business class',
      price: 120,
    }],
  SIGHTSEEING: [],
  RESTAURANT: [],
};
