'use client';
import React, { useContext, useState } from 'react';
import { useFormatter, useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { SelectedCompanyLayoutContext } from '../layout';
import BaseList, {
  BaseListItem,
  BaseListRow,
} from '@/app/_components/BaseList';
import { Company, Contract } from '@/graphql/types';
import EditContractModal from '@/app/_components/company/EditContractModal';
import BaseButton from '@/app/_components/BaseButton';
import AddContractModal from '@/app/_components/company/AddContractModal';
import IconPlusCircleFill from '@/app/_components/icons/IconPlusCircleFill';
import { useCompanyQuery } from '@/graphql/queries/companies/getCompany.generated';
import BaseIconButton from '@/app/_components/BaseIconButton';
import IconPencilAlt from '@/app/_components/icons/IconPencilAlt';

export default function Page() {
  const t = useTranslations();
  const format = useFormatter();
  const [addContractModalActive, setAddContractModalActive] = useState(false);
  const { companyId } = useParams<{ companyId: string }>();
  const [selectedContract, setSelectedContract] = useState<Contract>();
  const [editContractModalActive, setEditContractModalActive] = useState(false);
  const { selectedCompany, refetch } = useContext(SelectedCompanyLayoutContext);

  const AddContractModalClosed = () => {
    setAddContractModalActive(false);
  };

  const { data: companyData } = useCompanyQuery({
    variables: {
      where: {
        id: {
          equals: Number(companyId),
        },
      },
    },
  });

  const confirmAddContract = () => {
    refetch();
  };

  const editContractModalClosed = (success?: boolean) => {
    if (success) {
      refetch();
    }
    setEditContractModalActive(false);
  };

  const handleEditUserModalActive = (
    companyId: number,
    contract: Contract,
    e: React.MouseEvent<HTMLElement>
  ) => {
    e.stopPropagation();

    setSelectedContract(contract);

    if (companyId) {
      setEditContractModalActive(true);
    }
  };

  const renderEditActions = (companyId: number, contract: Contract) => {
    return (
      <td key={`renderEditActions-${contract?.id}`} className="py-4 pr-10">
        <div className="duration-250 flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <BaseIconButton
            icon={<IconPencilAlt />}
            theme="secondary"
            onClick={(e) => handleEditUserModalActive(companyId, contract, e)}
          />
        </div>
      </td>
    );
  };

  const baseListItem: BaseListItem = {
    headers: [
      t('global.name'),
      t('global.credits'),
      t('global.usageInterval'),
      t('global.startDate'),
      t('global.renewalInterval'),
      t('global.endDate'),
      t('global.autoRenewal'),
      '',
    ],
    rows:
      selectedCompany?.contracts?.map((contract: Contract) => {
        return {
          columns: [
            {
              type: 'default',
              text: t('products.' + [contract?.plan?.product?.slug]),
              isBold: true,
            },
            {
              type: 'default',
              text: contract?.usageAmount,
            },
            {
              type: 'default',
              text: t(`interval.${contract?.usageInterval}`),
            },
            {
              type: 'default',
              text: format.dateTime(new Date(contract?.startDate), {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              }),
            },
            {
              type: 'default',
              text: contract?.renewalInterval
                ? t(`interval.${contract?.renewalInterval}`)
                : '-',
            },
            {
              type: 'default',
              text: contract?.endDate
                ? format.dateTime(new Date(contract.endDate), {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                  })
                : '-',
            },
            {
              type: 'default',
              text: contract?.endDate ? t('global.no') : t('global.yes'),
            },
            {
              type: 'customColumn',
              children: renderEditActions(Number(companyId), contract),
            },
          ],
        } as BaseListRow;
      }) ?? [],
  };

  return (
    <>
      <div className="max-w-[100vw] grow overflow-x-auto">
        <div className="flex w-full flex-col justify-end bg-white p-5 lg:flex-row lg:px-10 lg:py-6">
          <div className="flex">
            <BaseButton
              theme="primary"
              onClick={() => setAddContractModalActive(true)}
            >
              <IconPlusCircleFill /> {t('global.addNewContract')}
            </BaseButton>
          </div>
        </div>
        <BaseList baseListItem={baseListItem} />
      </div>

      <AddContractModal
        isOpen={addContractModalActive}
        onClose={AddContractModalClosed}
        onConfirm={confirmAddContract}
        company={companyData?.company}
      />
      <EditContractModal
        isOpen={editContractModalActive}
        onClose={editContractModalClosed}
        onConfirm={confirmAddContract}
        company={companyData?.company as Company}
        contract={selectedContract as Contract}
      />
    </>
  );
}
