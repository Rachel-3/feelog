import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feed from './Feed';
import CalendarScreen from './Calendar';
import SearchScreen from './Search';
import Login from './Login';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchHeader from '../components/SearchHeader';

// 하단 탭 네비게이터 생성
const Tab = createBottomTabNavigator();

// 하단 탭 네비게이터 아이콘에 적용할 속성들 정의
type TabBarIconProps = {
  color: string;
  size: number;
};

function MainTab() {
  return (
    // Feed 탭 스크린 - Feed 탭 스크린 이름 정의
    // Calendar 탭 스크린 - Calender 탭 스크린 이름 정의
    // Search 탭 스크린 - Search 탭 스크린 이름 정의

    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false, // 하단 탭 레이블 텍스트 숨김
        tabBarActiveTintColor: '#5709b0', // 활성 탭의 아이콘 및 텍스트 색상
        tabBarInactiveTintColor: 'gray', // 비활성 탭의 아이콘 및 텍스트 색상
      }}>


      <Tab.Screen
        name="  Feeds" // 스크린의 정의
        component={Feed} // Feed 컴포넌트를 스크린에 연결
        options={{
          tabBarIcon: ({color, size}: TabBarIconProps) => (

            // 탭 아이콘 설정
            // 아이콘 - view-stream
            // 색상 크기 동적으로 설정
            <Icon name="view-stream" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="  Calendar" // 스크린 정의
        component={CalendarScreen} // Calendar 컴포넌트를 스크린에 연결
        options={{
          tabBarIcon: ({color, size}: TabBarIconProps) => (

            // 탭 아이콘 설정
            // 아이콘 - event
            // 색상 크기 동적으로 설정
            <Icon name="event" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="  Search" // 스크린 정의
        component={SearchScreen} // SearchScreen 컴포넌트를 스크린에 연결
        options={{
          title: '검색', // 탭에 표시될 제목 설정
          tabBarIcon: ({color, size}: TabBarIconProps) => (

            //탭 아이콘 설정
            // 아이콘 - search
            // 색상 크기 동적으로 설정
            <Icon name="search" size={size} color={color} />
          ),
          headerTitle: () => <SearchHeader />,
        }}
      />
      <Tab.Screen
        name="  Login"
        component={Login}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTab;
