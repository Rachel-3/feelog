import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 메시지 타입 정의
type MessageType = 'NOT_FOUND' | 'EMPTY_KEYWORD';

// 메시지 내용
const messages: Record<MessageType, string> = {
  NOT_FOUND: '검색 결과가 없습니다.',
  EMPTY_KEYWORD: '검색어를 입력하세요.',
};

// 컴포넌트 타입 정의
interface EmptySearchResultProps {
  type: MessageType;
}

// 검색 결과가 없거나 검색어가 비어있을 때 표시할 메시지 렌더링
const EmptySearchResult: React.FC<EmptySearchResultProps> = ({ type }) => {
  return (
    // 메시지를 중앙에 배치
    <View style={styles.block}>
      <Text style={styles.text}>{messages[type]}</Text>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#9e9e9e',
    fontSize: 16,
  },
});

export default EmptySearchResult;
