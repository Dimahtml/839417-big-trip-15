export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const SortType = {
  DEFAULT: 'default',
  TIME: 'time',
  PRICE: 'price',
  DISABLED: 'disabled',
};

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const MenuItem = {
  ADD_NEW_POINT: 'site-menu-add_new_point',
  TABLE: 'site-menu-table',
  STATS: 'site-menu-stats',
};

export const BLANK_POINT = {
  basePrice: 1,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination:
    {
      description: '',
      name: '',
      pictures: [],
    },
  isFavorite: false,
  offers: [],
  type: 'taxi',
};
