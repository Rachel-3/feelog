import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootStack from './screens/Root';
import {LogCProvider} from './context/LogC';
import {SearchCProvider} from './context/SearchC';
import 'react-native-get-random-values';

function App() {
  return (
    <NavigationContainer>
      <SearchCProvider>
        <LogCProvider>
          <RootStack />
        </LogCProvider>
      </SearchCProvider>
    </NavigationContainer>
  );
}

export default App;