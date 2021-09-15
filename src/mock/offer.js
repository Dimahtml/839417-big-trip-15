import {Types, OFFERS_BY_TYPES} from '../const.js';

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
