import React from 'react';
import { Linking } from 'react-native';
import * as UI from './UI';

interface Props {
  title: string;
  href: string;
  thumbnail?: string;
  ingredients: Array<string>;
}

const openLink = (href: string) => {
  if (Linking.canOpenURL(href)) {
    Linking.openURL(href);
  }
};

const RecipeRow: React.FC<Props> = ({
  title,
  href,
  thumbnail,
  ingredients,
}) => (
  <UI.Container onPress={() => openLink(href)}>
    {thumbnail ? <UI.Thumbnail source={{ uri: thumbnail }} /> : null}
    <UI.TitleContainer>
      <UI.Title>{title}</UI.Title>
      <UI.Description>{href}</UI.Description>
      <UI.IngredientContainer>
        {ingredients.map(ingredient => (
          <UI.Ingredient key={`${href}_${ingredient}`}>
            {ingredient}
          </UI.Ingredient>
        ))}
      </UI.IngredientContainer>
    </UI.TitleContainer>
  </UI.Container>
);

export default React.memo(RecipeRow);
