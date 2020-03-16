import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Container = styled.TouchableOpacity`
  border-bottom-color: #c9c9c9;
  padding: 8px 12px;
  flex-direction: row;
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
`;

export const Thumbnail = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const IngredientContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Ingredient = styled.Text`
  background-color: #efefef;
  padding: 4px 8px;
  margin: 0px 4px 4px 0px;
  border-radius: 6px;
  overflow: hidden;
`;

export const TitleContainer = styled.View`
  margin-left: 8px;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 17px;
`;

export const Description = styled.Text`
  font-size: 13px;
  margin-bottom: 8px;
`;
