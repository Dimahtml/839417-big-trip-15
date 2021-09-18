export const Types = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  TRANSPORT: 'transport',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTARAUNT: 'restaurant',
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
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

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  ADD_NEW_POINT: 'add_new_point',
  TABLE: 'table',
  STATS: 'stats',
};
