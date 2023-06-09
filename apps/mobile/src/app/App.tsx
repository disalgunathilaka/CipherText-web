import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import ConverstionList from '../screens/conversation-list';
import ChatScreen from '../screens/chat-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login-screen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <IconRegistry icons={[EvaIconsPack]} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavStack />
        </ApplicationProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const NavStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Converstations"
        component={ConverstionList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};

export default App;
