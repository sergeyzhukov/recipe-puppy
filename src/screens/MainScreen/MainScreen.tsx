import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, shallowEqual } from 'react-redux';
import debounce from 'debounce';
import * as UI from './UI';
import { RecipeRow } from '../../components';
import { Receipt, useTypedSelector } from '../../interfaces/types';
import { loadRecipes, clearRecipes } from '../../actions/api';
import { PAGE_SIZE, MAX_LOADED } from '../../constants';

interface SelectorState {
  recipes: Receipt[];
  isLoading: boolean;
  error: string;
}

const MainScreen = () => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const { recipes, isLoading, error }: SelectorState = useTypedSelector(
    state => ({
      recipes: state.recipes.list,
      isLoading: state.recipes.isLoading,
      error: state.recipes.error,
    }),
    shallowEqual,
  );

  const delayedQuery = useCallback(
    debounce((q: string) => {
      dispatch(clearRecipes());
      dispatch(loadRecipes(q));
    }, 500),
    [],
  );

  useEffect(
    useCallback(() => {
      dispatch(loadRecipes());
    }, [dispatch]),
    [],
  );

  const handleInputChange = (text: string) => {
    setSearchText(text);
    delayedQuery(text);
  };

  const handleEndReached = () => {
    if (
      recipes.length < MAX_LOADED &&
      recipes.length % PAGE_SIZE === 0 &&
      !isLoading
    ) {
      const nextPage = Math.floor(recipes.length / PAGE_SIZE) + 1;
      dispatch(loadRecipes(searchText, nextPage));
    }
  };

  return (
    <UI.Container>
      <UI.TextInputContainer>
        <UI.SearchInput
          placeholder="Enter title"
          value={searchText}
          clearButtonMode="while-editing"
          onChangeText={handleInputChange}
        />
      </UI.TextInputContainer>
      <FlatList<Receipt>
        style={styles.list}
        data={recipes}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        onEndReached={handleEndReached}
        ListFooterComponent={() => {
          if (isLoading) {
            return <ActivityIndicator animating />;
          }
          if (error) {
            return <UI.ListErrorMessage>{error}</UI.ListErrorMessage>;
          }
          return null;
        }}
        keyExtractor={({ href }) => `receipt_${href}`}
        renderItem={({ item }) => (
          <RecipeRow
            title={item.title}
            href={item.href}
            thumbnail={item.thumbnail}
            ingredients={item.ingredients}
          />
        )}
      />
    </UI.Container>
  );
};

// FlatList can't be used in styled component with type
const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default React.memo(MainScreen);
