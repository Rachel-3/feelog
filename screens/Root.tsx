import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Write from './Write';
import Login from './Login';
import Signup from './Signup';

export type RootStackParamList = {
  usenavigate(arg0: string): unknown;
  navigate(arg0: string): unknown;
  MainTab: {
    screen: 'Feed' | 'Calendar' | 'Search' | 'Login' | 'Signup';
  };
  Write: undefined;
  Login: undefined;
  Signup: undefined;
  Feed: undefined; 
};

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainTab"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Write"
        component={Write}
        options={{ headerShown: false }}
      />
      {/* 다른 스크린들 추가 가능 */}
    </Stack.Navigator>
  );
}

export default RootStack;
