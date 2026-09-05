import { UserAttr } from "./user.interface";
import { Model } from "sequelize";

export type PropertyType = 
  |"house"
  |"shared_apartment"
  |"penthouse"
  |"studio_apartment"
  |"shop"
  |"flats/apartments"
  |"office_spaces"
  |"mansions"
  |"self_contain"
  |"lands"
  |"offPlan_projects"
  |"terraces"
  |"commercial_properties"
  |"duplexes";

export interface PropertyAttr {
  propertyId?: string;
  userId?: string;
  user?: UserAttr;
  active?: boolean;
  reviewNote?: string;
  details?: {
    title?: string;
    propertyType?: PropertyType;
    listingType?: 'sale' | 'rent';
    status?: string;
    bedrooms?: string;
    bathrooms?: string;
    area_sq_ft?: number;
    yearBuilt?: number;
    description?: string;
    features?: {
      parking?: boolean;
      airConditioning?: boolean;
      balcony?: boolean;
      swimmingPool?: boolean;
      gym?: boolean;
      security?: boolean;
      furnished?: boolean;
      elevator?: boolean;
      garden?: boolean;
    };
  };
  media?: {
    images?: Array<{
      id?: string;
      url?: string;
      file?: File;
      isFeatured: boolean;
    }>;
    videoTourUrl?: string;
    virtualTourUrl?: string;
    floorPlan?: {
      url?: string;
      file?: File;
    };
  };
  location?: {
    country?: string;
    city?: string;
    state?: string;
    neighborhood?: string;
    zipCode?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    locationDescription?: string;
    nearbyPlaces?: {
      school?: string;
      shopping?: string;
      transportation?: string;
      park?: string;
    };
  };
  pricing?: {
    price?: number;
    pricePerSqFt?: number;
    rentPrice?: number;
    rentPeriod?: string;
    securityDeposit?: number;
    leaseTerm?: string;
    isFeatured?: boolean;
    propertyTax?: number;
    hoaFees?: number;
    utilitiesIncluded?: {
      water?: boolean;
      electricity?: boolean;
      gas?: boolean;
      internet?: boolean;
      cable?: boolean;
      trash?: boolean;
    }
    privateNotes?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export interface PropertyInstance 
  extends Model<PropertyAttr>, 
    PropertyAttr {}


export interface MessageAttr {
  messageId?: string;
  userId?: string;
  agentId?: string;
  propertyId?: string;
  message?: string;
  name?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export interface MessageInstance 
  extends Model<MessageAttr>, 
    MessageAttr {}

export interface LikedPropertyAttr {
  likeId?: string;
  liked?: boolean;
  userId?: string;
  propertyId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface LikedPropertyInstance 
  extends Model<LikedPropertyAttr>, 
    LikedPropertyAttr {}