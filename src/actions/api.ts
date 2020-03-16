import { Dispatch } from 'redux';
import querystring from 'querystring';
import ActionTypes from '../middleware/actionTypes';
import { API_URL } from '../constants';

export const clearRecipes = () => ({
  type: ActionTypes.CLEAR_RECIPES,
});

export const loadRecipes = (query: string = '', page: number = 1) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypes.API_RECIPES_REQUEST,
    });

    const qs = querystring.stringify({
      q: query,
      p: page,
    });

    const response = await fetch(`${API_URL}?${qs}`);
    if (response.status !== 200) {
      dispatch({
        type: ActionTypes.API_RECIPES_FAILURE,
        payload: {
          error: 'Failed to load data',
        },
      });
      return;
    }
    try {
      const responseJSON = await response.json();
      dispatch({
        type: ActionTypes.API_RECIPES_SUCCESS,
        payload: responseJSON,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.API_RECIPES_FAILURE,
        payload: {
          error,
        },
      });
    }
  };
};
