import { createContext } from 'react';

export const SelectedAssignmentLayoutContext = createContext<{
  hasChanged: boolean;
  setHasChanged: (value: boolean) => void;
  canEdit: boolean;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  setHandleSave: (value: () => void) => void;
  assignment?: any;
  loading: boolean;
  error?: any;
  refetch: () => void;
}>({
  hasChanged: false,
  canEdit: false,
  editMode: false,
  setHasChanged: () => {},
  setEditMode: () => {},
  setHandleSave: () => {},
  loading: false,
  refetch: () => {},
  error: undefined,
});
