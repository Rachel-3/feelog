import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

// FeedListItem 타입 정의
interface FeedListItemProps {
  log: Log;
}

// 네비게이션 스택의 파라미터 타입 정의
type RootStackParamList = {
  Write: {
    log: Log;
  };
};

// Write 화면으로 이동을 위한 네비게이션 타입 정의
type FeedListItemNavigationProp = StackNavigationProp<RootStackParamList, 'Write'>;

// 날짜 포매팅 함수
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 60) {
    return '방금 전';
  } else if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko });
  } else {
    return format(date, 'PPP EEE p', { locale: ko });
  }
}

// 텍스트 축약 함수
function truncate(text: string): string {
  return text.length > 100 ? `${text.substring(0, 97)}...` : text;
}

// FeedListItem 컴포넌트
const FeedListItem: React.FC<FeedListItemProps> = ({ log }) => {
  const navigation = useNavigation<FeedListItemNavigationProp>();

  // 로그 아이템 선택 시 Write 화면으로 이동
  const onPress = () => {
    navigation.navigate('Write', { log });
  };

  return (
    // Pressible 컴포넌트로 감싸 클릭 가능
    <Pressable
      style={styles.block}
      android_ripple={{ color: '#ededed' }}
      onPress={onPress}>
      <Text style={styles.date}>{formatDate(log.date)}</Text>
      <Text style={styles.title}>{log.title}</Text>
      <Text style={styles.body}>{truncate(log.body)}</Text>
    </Pressable>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  date: {
    fontSize: 12,
    color: '#546e7a',
    marginBottom: 8,
  },
  title: {
    color: '#37474f',
    fontSize: 16,
    lineHeight: 21,
  },
  body: {
  
  }
});

export default FeedListItem;
