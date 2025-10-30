import IconBuilding from '@/app/_components/icons/IconBuilding';
import { CompanyType, AssignmentType } from '@/graphql/types';

interface Props {
  assignmentCompanyLogo?: string;
  assignmentDescriptionIsVisible: boolean;
  assignmentIsRead?: boolean;
  assignmentType: string;
  companyType: string;
}

const AssignmentLogo: React.FC<Props> = ({
  assignmentCompanyLogo,
  assignmentDescriptionIsVisible,
  assignmentIsRead,
  assignmentType,
  companyType,
}) => {
  type IconVariant = 'basicIcon' | 'proPremiumIcon' | 'companyDefaultLogo';

  const iconMap: Record<IconVariant, JSX.Element> = {
    basicIcon: <div className="hidden h-12 w-12 shrink-0 lg:flex"></div>,
    proPremiumIcon: (
      <div
        className={`font-heading relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-xs font-bold uppercase tracking-tight text-white  ${
          assignmentIsRead
            ? 'border-transparent'
            : 'border-neutral-200 shadow-md'
        }`}
      >
        <span className="flex h-full w-full items-center justify-center rounded-lg border border-white bg-gradient-to-r from-[#EE7056] via-[#ED6655] to-[#FBAA58]">
          {companyType === CompanyType.Freelancer && <span>Pro</span>}
          {companyType !== CompanyType.Freelancer && (
            <span className="text-3xs">Premium</span>
          )}
        </span>
      </div>
    ),
    companyDefaultLogo: (
      <div
        className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border  ${
          assignmentIsRead && assignmentCompanyLogo
            ? 'border-transparent'
            : 'border-neutral-200 shadow-md'
        }`}
      >
        <figure className="absolute inset-0 flex items-center rounded-lg border border-white bg-white">
          <i className="absolute inset-0 flex items-center justify-center rounded-lg">
            <IconBuilding />
          </i>
          {assignmentCompanyLogo && (
            <img
              className="absolute left-0 top-0 h-full w-full rounded-md bg-white object-contain"
              src={assignmentCompanyLogo}
              alt=""
            />
          )}
        </figure>
      </div>
    ),
  };

  function determineLogo(): JSX.Element {
    if (assignmentType === AssignmentType.Basic) {
      if (assignmentDescriptionIsVisible) {
        return iconMap.basicIcon;
      } else {
        return iconMap.proPremiumIcon;
      }
    }
    if (assignmentType === AssignmentType.Top) {
      if (assignmentDescriptionIsVisible) {
        return iconMap.companyDefaultLogo;
      } else {
        return iconMap.proPremiumIcon;
      }
    }
    return iconMap.companyDefaultLogo;
  }

  return determineLogo();
};

export default AssignmentLogo;
