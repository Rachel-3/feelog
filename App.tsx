import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainTab from './screens/Main';
import RootStack from './screens/Root';
import {LogCProvider} from './context/LogC';
import {SearchCProvider} from './context/SearchC';
import 'react-native-get-random-values';
// import LoadingScreen from './screens/LoadingScreen';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    const checkLogin = async () => {
      console.log("Checking login status...");
      const userToken = await AsyncStorage.getItem('userToken');
      console.log("userToken:", userToken);
      setIsLoggedIn(!!userToken);
    };
  
    checkLogin();
  }, []);

  if (isLoading) {
    // return <LoadingScreen />; // 로딩 화면 컴포넌트 (별도로 구현 필요)
  }

  return (
    <NavigationContainer>
      <SearchCProvider>
        <LogCProvider>
          {isLoggedIn ? <MainTab /> : <RootStack />}
        </LogCProvider>
      </SearchCProvider>
    </NavigationContainer>
  );
}

export default App;