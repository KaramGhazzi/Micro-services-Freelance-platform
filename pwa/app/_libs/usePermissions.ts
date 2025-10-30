'use client';

import {
  hasPermissions,
  PermissionArray,
  allPermissions,
  PermissionArgs,
} from '@package/permission';
import {
  UserCompanyRole,
  UserRole,
} from '@package/types/dist/class-validator/@generated/enums';
import { useAuth } from '../_hooks/useAuth';

export default function usePermissions() {
  const { currentUser, currentCompanyUser } = useAuth();

  return {
    hasPermissions: (permissionsToCheck: PermissionArray | PermissionArgs) => {
      const userRole = (currentUser?.role ?? UserRole.USER) as UserRole;
      const currentCompanyUserRoles =
        currentCompanyUser?.userCompanyRoles ?? [];
      const companyRoles = currentCompanyUserRoles.map(
        (role) => role?.role
      ) as unknown as UserCompanyRole[];

      return hasPermissions(
        allPermissions(userRole, companyRoles),
        permissionsToCheck
      );
    },
  };
}
