import React from 'react';
import { useTranslations } from 'next-intl';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import { User } from '@/graphql/types';
import { useUserQuery } from '@/graphql/queries/user/user.generated';

type Props = {
  user: User | undefined;
};
const baseUrl = '/admin/bedrijven';

const Companies: React.FC<Props> = ({ user }) => {
  const t = useTranslations();

  const { data, loading } = useUserQuery({
    variables: {
      id: Number(user?.id),
    },
  });

  const baseListItem: BaseListItem = {
    headers: [
      'ID',
      t('global.company'),
      t('global.companyType'),
      t('global.roleAtCompany'),
    ],
    rows:
      data?.user?.userCompanies?.map((userCompany) => {
        return {
          url: `${baseUrl}/${userCompany?.companyId}`,
          columns: [
            {
              type: 'default',
              text: String(userCompany.companyId),
            },
            {
              type: 'default',
              text: userCompany.company.name || '',
            },
            {
              type: 'default',
              text: t(`company.type.${userCompany.company.type}`),
            },
            {
              type: 'default',
              text: userCompany.userCompanyRoles
                ?.map((role) => t(`account.users.userCompanyRole.${role.role}`))
                .join(', '),
            },
          ],
        } satisfies BaseListRow;
      }) || [],
  };

  return (
    <section className="py-10">
      <div className="mb-5 px-10">
        <h1 className="font-semibold text-neutral-900">
          {t('companies.title')}
        </h1>
      </div>
      <div className="h-full max-w-[100vw] overflow-auto">
        <BaseList loading={loading} baseListItem={baseListItem} />
      </div>
    </section>
  );
};

export default Companies;
