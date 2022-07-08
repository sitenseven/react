import React from 'react';
import {ButtonRegular} from '../../common/buttonRegular';
import {GetStartedTemplate} from './getStartedTemplate';

export const GetStarted1 = ({navigation}) => {
  function onPress() {
    navigation.navigate('register');
  }
  return (
    <GetStartedTemplate
      navigation={navigation}
      buttonToPut={
        <ButtonRegular title="Create an account" onClick={onPress} />
      }
    />
  );
};
