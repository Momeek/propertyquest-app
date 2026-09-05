export interface AdminAttr {
  adminId?: string;
  userName?: string;
  fullName?: string;
  email?: string;
  isSuperAdmin?: boolean;
  password?: string;
  permissions?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
