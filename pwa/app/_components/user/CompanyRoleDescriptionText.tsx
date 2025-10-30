import { useTranslations } from 'next-intl';
import React from 'react';
import { UserCompanyRole } from '@package/types/dist/class-validator/@generated/enums';
import IconCheckmarkSm from '../icons/IconCheckmarkSm';
import IconXSm from '../icons/IconXSm';

interface CompanyRoleDescriptionTextProps {
  userCompanyRole: UserCompanyRole;
}

const CompanyRoleDescriptionText = ({
  userCompanyRole,
}: CompanyRoleDescriptionTextProps) => {
  const t = useTranslations();

  const UserCompanyRoleDescriptionText: {
    text: string;
    forRole: UserCompanyRole[];
  }[] = [
    {
      text: t(
        `account.users.userCompanyRoleDescription.subscriptionManagement`
      ),
      forRole: [UserCompanyRole.OWNER],
    },
    {
      text: t(`account.users.userCompanyRoleDescription.invoiceManagement`),
      forRole: [UserCompanyRole.OWNER],
    },
    {
      text: t(`account.users.userCompanyRoleDescription.usersManagement`),
      forRole: [UserCompanyRole.OWNER],
    },
    {
      text: t(`account.users.userCompanyRoleDescription.assignmentManagement`),
      forRole: [UserCompanyRole.OWNER, UserCompanyRole.SUPERVISOR],
    },
    {
      text: t(
        `account.users.userCompanyRoleDescription.assignmentTransferring`
      ),
      forRole: [UserCompanyRole.OWNER, UserCompanyRole.SUPERVISOR],
    },
    {
      text: t(`account.users.userCompanyRoleDescription.replyToAssignments`),
      forRole: [
        UserCompanyRole.OWNER,
        UserCompanyRole.SUPERVISOR,
        UserCompanyRole.COLLABORATOR,
      ],
    },
    {
      text: t(
        `account.users.userCompanyRoleDescription.handleAssignmentReplies`
      ),
      forRole: [
        UserCompanyRole.OWNER,
        UserCompanyRole.SUPERVISOR,
        UserCompanyRole.COLLABORATOR,
      ],
    },
    {
      text: t(`account.users.userCompanyRoleDescription.viewAllAssignments`),
      forRole: [
        UserCompanyRole.OWNER,
        UserCompanyRole.SUPERVISOR,
        UserCompanyRole.COLLABORATOR,
      ],
    },
  ];

  return (
    <div className="mt-4">
      {userCompanyRole && (
        <p className="mb-1">
          {t('account.users.userCompanyRolePermissionsText', {
            role: t(
              `account.users.userCompanyRole.${userCompanyRole}`
            ).toLowerCase(),
          })}
        </p>
      )}
      <ul className="grid grow content-start gap-1 text-sm font-medium text-neutral-700">
        {UserCompanyRoleDescriptionText.map((item, index) => {
          return (
            <li
              key={`${userCompanyRole}-description-${index}`}
              className="flex gap-1"
            >
              {item.forRole.includes(userCompanyRole) ? (
                <>
                  <IconCheckmarkSm className="text-secondary-500" />
                  <span>{item.text}</span>
                </>
              ) : (
                <>
                  <IconXSm className="text-error-500" />
                  <span>{item.text}</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CompanyRoleDescriptionText;
