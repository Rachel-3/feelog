import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

// 로그 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

// 네비게이션 스택 파라미터 리스트 정의
type RootStackParamList = {
  Write: undefined;
};

function Feed() {
  const { currentUser } = useAuth(); // 현재 로그인한 사용자 가져오기
  const [logs, setLogs] = useState<Log[]>([]); // 로그 상태 관리
  const [hidden, setHidden] = useState<boolean>(false); // 버튼 숨김 상태 관리

  // 일기 데이터 불러오는 함수
  const loadDiaries = async () => {
    try {
      // 백엔드 서버에서 일기 데이터를 불러옵니다.
      const response = await fetch('http://10.0.2.2:8080/diaries', {
        method: 'GET', // 또는 백엔드 서버에 맞는 HTTP 메소드
        headers: {
          // 필요한 경우 헤더를 설정합니다. 예: 인증 토큰
          'Authorization': 'Bearer YOUR_AUTH_TOKEN',
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Server response was not ok');
      }
  
      const data = await response.json();
      setLogs(data); // 데이터를 상태에 저장합니다.
    } catch (error) {
      console.error('Failed to fetch diaries:', error);
    }
  };
  

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadDiaries();
  }, []);

  // 네비게이션 훅 사용
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // 'Write' 스크린으로 이동하는 함수
  const navigateToWrite = () => {
    navigation.navigate('Write');
  };

  // FeedList에서 스크롤 이벤트 처리
  const onScrolledToBottom = (isBottom: boolean) => {
    setHidden(isBottom);
  };

  return (
    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />
      <FloatingWriteButton hidden={hidden} onPress={navigateToWrite} />
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default Feed;
