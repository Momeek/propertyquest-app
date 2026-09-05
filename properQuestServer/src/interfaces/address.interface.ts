import { Model } from 'sequelize';

export interface StateAttr {
  stateId?: string;
  stateName?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CityAttr {
  cityId?: string;
  stateId?: string;
  State?: StateAttr;
  cityName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddressAttr {
  addressId?: string;
  stateId?: string;
  cityId?: string;
  State?: StateAttr;
  City?: CityAttr;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  pincode?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface StateInstance extends Model<StateAttr>, StateAttr {}
export interface CityInstance extends Model<CityAttr>, CityAttr {}
export interface AddressInstance extends Model<AddressAttr>, AddressAttr {}
