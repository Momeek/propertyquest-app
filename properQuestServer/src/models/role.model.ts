
export interface Permission {
  name: string;
  view: string;
  manage: string;
}

export type RolePermissionAction = 'view' | 'manage';

export const adminPermissions = [
  {
    name: 'Admin',
    view: 'VIEW_ADMIN',
    manage: 'MANAGE_ADMIN',
  },
  {
    name: 'Dashboard',
    view: 'VIEW_DASHBOARD',
    manage: 'MANAGE_DASHBOARD',
  },
  {
    name: 'Users',
    view: 'VIEW_USERS',
    manage: 'MANAGE_USERS',
  },
  {
    name: 'Reviews',
    view: 'VIEW_REVIEWS',
    manage: 'MANAGE_REVIEWS',
  },
] as const;

export type AdminRolePermission = (typeof adminPermissions)[number]['name'];
