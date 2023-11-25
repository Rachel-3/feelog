import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

// 네비게이션 스택 생성
const Stack = createNativeStackNavigator();

function Root() {

  // MainTab 스크린 
  // Main 컴포넌트를 렌더링하는 스크린 정의

  // Write 스크린
  // Write 컴포넌트를 렌더링하는 스크린 정의

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab" // 스크린의 이름 정의
        component={Main} // Main 컴포넌트를 스크린에 연결
        options={{headerShown: false}} // 헤더 숨김
      />

      <Stack.Screen
        name="Write" // 스크린의 이름 정의
        component={Write} // Write 컴포넌트를 스크린에 연결
        options={{headerShown: false}} // 헤더 숨김
      />
      <Stack.Screen
        name="Login" // 스크린의 이름 정의
        component={Login} // Write 컴포넌트를 스크린에 연결
      />
      <Stack.Screen 
        name="Signup" 
        component={Signup}
      />
      
    </Stack.Navigator>
  );
}

export default Root;
