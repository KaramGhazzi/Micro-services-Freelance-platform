import { searchToolbarKeys } from '../(dashboard)/opdracht-vinden/zoeken/_components/SearchToolbar';

export default function deleteFilterStorage() {
  searchToolbarKeys.forEach((key) => {
    sessionStorage.removeItem(key);
  });

  sessionStorage.removeItem('showFavorites');
  sessionStorage.removeItem('savedSearch');
  sessionStorage.removeItem('loadedInitialSavedSearch');
}
