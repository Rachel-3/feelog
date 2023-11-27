import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeedListItem from './FeedListItem';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

interface FeedListProps {
  logs: Log[];
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onScrolledToBottom?: (isBottom: boolean) => void; // 선택적으로 변경
  ListHeaderComponent?: React.ReactElement;
}



function FeedList({ logs, onScrolledToBottom, onScroll, ListHeaderComponent }: FeedListProps) {
  // 스크롤 이벤트를 처리하는 함수
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

    // 스크롤 위치에 따라 onScrolledToBottom 호출
    if (contentSize.height > layoutMeasurement.height && distanceFromBottom < 72) {
      if (onScrolledToBottom) {
        onScrolledToBottom(true);
      }
    } else {
      if (onScrolledToBottom) {
        onScrolledToBottom(false);
      }
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({ item }) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll || handleScroll} // 여기에서 새로운 handleScroll 함수 사용
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}



const styles = StyleSheet.create({
  block: { flex: 1 },
  separator: {
    backgroundColor: '#e0e0e0',
    height: 1,
    width: '100%',
  },
});

export default FeedList;
