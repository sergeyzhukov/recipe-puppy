import ActionTypes from '../middleware/actionTypes';
import { RecipesState, Receipt } from '../interfaces/types';
import { AnyAction, Reducer } from 'redux';

const initialState = {
  list: [],
  isLoading: false,
  error: undefined,
};

export const recipes: Reducer = (
  state: RecipesState = initialState,
  action: AnyAction,
) => {
  switch (action.type) {
    case ActionTypes.CLEAR_RECIPES:
      return initialState;
    case ActionTypes.API_RECIPES_REQUEST:
      return { ...state, isLoading: true, error: undefined };
    case ActionTypes.API_RECIPES_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    case ActionTypes.API_RECIPES_SUCCESS:
      const { results } = action.payload;
      const recipesList: Array<Receipt> = results.map(recipe => ({
        title: recipe.title,
        href: recipe.href,
        thumbnail: recipe.thumbnail,
        ingredients: recipe.ingredients.split(','),
      }));

      return {
        ...state,
        list: [...state.list, ...recipesList],
        isLoading: false,
        error: undefined,
      };
    default:
      return state;
  }
};
