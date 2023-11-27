import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './Feed';
import CalendarScreen from './Calendar';
import SearchScreen from './Search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Write from './Write';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#5709b0',
        tabBarInactiveTintColor: 'gray',
      }}>

      <Tab.Screen
        name="Feeds"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="view-stream" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Write"
        component={Write}
        options={{ tabBarButton: () => null }} // 탭 바에서 'Write'를 숨깁니다
      />
    </Tab.Navigator>
  );
}

export default MainTab;
