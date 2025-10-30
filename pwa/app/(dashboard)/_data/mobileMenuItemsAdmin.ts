import IconFindJobs from '../_components/layout/sidebar/icons/IconFindJobs';
import IconDashboard from '../../_components/icons/IconDashboard';
import IconUsersNav from '@/app/_components/icons/IconUsersNav';
import IconCompaniesNav from '@/app/_components/icons/IconCompaniesNav';

import IconAssessmentNav from '@/app/_components/icons/IconAssessmentNav';

const mobileMenuItems = [
  {
    title: 'admin.dashboard',
    href: '/admin/dashboard',
    icon: IconDashboard,
  },
  {
    title: 'admin.users',
    href: '/admin/gebruikers',
    icon: IconUsersNav,
  },
  {
    title: 'admin.companies',
    href: '/admin/bedrijven',
    icon: IconCompaniesNav,
  },
  {
    title: 'admin.assignments',
    href: '/admin/opdrachten',
    icon: IconFindJobs,
  },
  {
    title: 'admin.forApproval',
    href: '/admin/keuren',
    icon: IconAssessmentNav,
  },
];

export default mobileMenuItems;
