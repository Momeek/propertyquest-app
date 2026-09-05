export interface UserAttr {
  userId?: string;
  email?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  name?: string;
  surname?: string;
  phone?: string;
  dateOfbirth?: string;
  gender?: string;
  type?: "google" | "facebook" | "apple" | "local";
  role?:
    | "admin"
    | "user"
    | "agent/broker"
    | "property_manager"
    | "agency"
    | "developer"
    | "landlord";
  active?: boolean;
  lastLogin?: Date;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  UserPassword?: UserPasswordAttr;
  UserDocument?: UserDocumentAttr;
  professionalInfo?: {
    yearOfExperience?: number;
    licenseNumber?: string;
    company?: string;
    bio?: string;
    areasOfExpert?: {
      residential?: boolean;
      investment?: boolean;
      commercial?: boolean;
      rental?: boolean;
      luxury?: boolean;
      international?: boolean;
    };
  };
  location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    serviceAreas?: string;
  };
  socialMedia?: {
    website?: string;
    linkedIn?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserPasswordAttr {
  userPasswordId?: string;
  userId?: string;
  password?: string;
  secret?: string;
  User?: UserAttr;
  resetToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserDocumentAttr {
  userDocumentId?: string;
  userId?: string;
  cacNumber?: string;
  nin?: string;
  businessDocumentUrl?: string;
  isAffiliated?: boolean;
  affiliationDocumentUrl?: string;
  inReview?: boolean;
  rejected?: boolean;
  User?: UserAttr;
  docType?: string;
  reviewNote?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
