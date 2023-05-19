/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  Text,
  ApplicationProvider,
  Button,
  IconRegistry,
} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import LoginScreen from '../screens/LoginScreen';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

const App: React.FC = () => {
  return (
    <>
      <IconRegistry icons={[EvaIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <LoginScreen />
      </ApplicationProvider>
    </>
  );
};

export default App;
