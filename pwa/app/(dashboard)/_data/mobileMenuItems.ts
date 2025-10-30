import IconFindJobs from '../../_components/icons/IconFindJobs';
import IconPlaceJobs from '../../_components/icons/IconPlaceJobs';

import IconRocket from '../_components/layout/sidebar/icons/IconRocket';

const placeItem = {
  title: 'place',
  href: '/opdracht-plaatsen',
  hrefOverwrite: '#',
  icon: IconPlaceJobs,
  items: [
    {
      title: 'new-assignment',
      href: '/opdracht-plaatsen/nieuwe-opdracht',
    },
    {
      title: 'my-assignments',
      href: '/opdracht-plaatsen/mijn-opdrachten',
    },
    {
      title: 'received-reviews',
      href: '/opdracht-plaatsen/ontvangen-beoordelingen',
    },
  ],
};

const findItem = {
  title: 'find',
  href: '/opdracht-vinden',
  hrefOverwrite: '#',
  icon: IconFindJobs,
  items: [
    {
      title: 'search',
      href: '/opdracht-vinden/zoeken',
    },
    {
      title: 'my-searches',
      href: '/opdracht-vinden/mijn-zoekopdrachten',
    },
    {
      title: 'my-application-profiles',
      href: '/opdracht-vinden/mijn-reactieprofielen',
    },
    {
      title: 'my-responses',
      href: '/opdracht-vinden/mijn-reacties',
    },
    {
      title: 'given-reviews',
      href: '/opdracht-vinden/gegeven-beoordelingen',
    },
  ],
};

export const proItem = {
  title: 'pro',
  href: '/pro',
  icon: IconRocket,
};

export const mobileMenuItemsOrganisation = [placeItem, findItem];

export const mobileMenuItemsFreelancer = [findItem, placeItem, proItem];
