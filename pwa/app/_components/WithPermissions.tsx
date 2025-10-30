'use client';

import React, { useEffect, useState } from 'react';
import { PermissionArray } from '@package/permission';
import usePermissions from '../_libs/usePermissions';

type Props = {
  children: React.ReactNode;
  permissions: PermissionArray;
};

/**
 * This component is used to render children only if the user has the required permissions.
 * If the user does not have the required permissions, the children will not be rendered.
 * A user should have ALL (every) the required permissions to render the children.
 *
 * @param children
 */
const WithPermissions: React.FC<Props> = ({ children, permissions }) => {
  const { hasPermissions } = usePermissions();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  if (permissions?.length && !hasPermissions(permissions)) {
    return null;
  }

  return children;
};

export default WithPermissions;
