import { useSelector, TypedUseSelectorHook } from 'react-redux';

export interface Receipt {
  title: string;
  href: string;
  thumbnail?: string;
  ingredients: Array<string>;
}

export interface RecipesState {
  list: Receipt[];
  isLoading: boolean;
  error: string;
}

export interface RootState {
  recipes: RecipesState;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
