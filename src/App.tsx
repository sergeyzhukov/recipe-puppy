import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './screens';
import * as reducers from './reducers';

const Stack = createStackNavigator();
const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboardAvoidingView}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Recipe Puppy" component={MainScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
});

export default App;
