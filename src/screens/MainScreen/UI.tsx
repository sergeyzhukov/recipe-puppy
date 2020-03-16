import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;

export const TextInputContainer = styled.View`
  padding: 8px 12px;
  background-color: #fff;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: #c9c9c9;
`;

export const SearchInput = styled.TextInput`
  height: 44px;
  font-size: 17px;
  background-color: #fff;
`;

export const ListErrorMessage = styled.Text`
  margin: 12px 0;
  text-align: center;
`;
