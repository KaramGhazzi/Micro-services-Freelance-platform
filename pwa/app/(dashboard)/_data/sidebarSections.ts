import IconReviews from '../_components/layout/sidebar/icons/IconReviews';
import IconNewAssignment from '@/app/_components/icons/IconNewAssignment';
import IconMyAssignments from '@/app/_components/icons/IconMyAssignments';
import IconSearchAssignments from '@/app/_components/icons/IconSearchAssignments';
import IconMySearchqueries from '@/app/_components/icons/IconMySearchqueries';
import IconMyApplicationProfiles from '@/app/_components/icons/IconMyApplicationProfiles';
import IconMyResponses from '@/app/_components/icons/IconMyResponses';
import { BaseSidebarSection } from '@/app/_components/BaseSidebar';

const findAssignmentItems = [
  {
    title: 'search',
    href: '/opdracht-vinden/zoeken',
    icon: IconSearchAssignments,
  },
  {
    title: 'my-searches',
    href: '/opdracht-vinden/mijn-zoekopdrachten',
    icon: IconMySearchqueries,
  },
  {
    title: 'my-application-profiles',
    href: '/opdracht-vinden/mijn-reactieprofielen',
    icon: IconMyApplicationProfiles,
  },
  {
    title: 'my-responses',
    href: '/opdracht-vinden/mijn-reacties',
    icon: IconMyResponses,
  },
  {
    title: 'given-reviews',
    href: '/opdracht-vinden/gegeven-beoordelingen',
    icon: IconReviews,
  },
];

const placeAssignmentItems = [
  {
    title: 'new-assignment',
    href: '/opdracht-plaatsen/nieuwe-opdracht',
    icon: IconNewAssignment,
  },
  {
    title: 'my-assignments',
    href: '/opdracht-plaatsen/mijn-opdrachten',
    icon: IconMyAssignments,
  },
  {
    title: 'received-reviews',
    href: '/opdracht-plaatsen/ontvangen-beoordelingen',
    icon: IconReviews,
  },
];

export const freelancerSidebarSections: BaseSidebarSection[] = [
  {
    title: 'find-assignments',
    collapsed: false,
    items: findAssignmentItems,
  },
  {
    title: 'place-assignment',
    collapsed: true,
    items: placeAssignmentItems,
  },
];

export const organisationSidebarItems: BaseSidebarSection[] = [
  {
    title: 'place-assignment',
    collapsed: false,
    items: placeAssignmentItems,
  },
  {
    title: 'find-assignments',
    collapsed: false,
    items: findAssignmentItems,
  },
];
