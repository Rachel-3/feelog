import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainTab from './screens/Main';
import RootStack from './screens/Root';
import { LogCProvider } from './context/LogC';
import 'react-native-get-random-values';


function App() {
  return (
    <AuthProvider>
      <LogCProvider>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </LogCProvider>
    </AuthProvider>
  );
}

const MainTabNavigator = () => {
  const { currentUser } = useAuth();

  // currentUser가 null이면 로그인 화면으로 리디렉션
  if (currentUser === null) {
    return <RootStack />;
  }

  // currentUser가 존재하면 로그인된 것으로 간주
  return <MainTab />;
};

export default App;
