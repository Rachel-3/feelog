import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import FeedListItem from './FeedListItem';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

interface FeedListProps {
  logs: Log[];
  onScrolledToBottom: (isBottom: boolean) => void;
  ListHeaderComponent?: React.ReactElement;
}

function FeedList({ logs, onScrolledToBottom, ListHeaderComponent }: FeedListProps) {
  const onScroll = (event: {
    nativeEvent: {
      contentSize: { height: number };
      layoutMeasurement: { height: number };
      contentOffset: { y: number };
    };
  }) => {
    if (!onScrolledToBottom) return;

    const { contentSize, layoutMeasurement, contentOffset } = event.nativeEvent;
    const distanceFromBottom = contentSize.height - layoutMeasurement.height - contentOffset.y;

    if (contentSize.height > layoutMeasurement.height && distanceFromBottom < 72) {
      onScrolledToBottom(true);
    } else {
      onScrolledToBottom(false);
    }
  };

  return (
    <FlatList
      data={logs}
      style={styles.block}
      renderItem={({ item }) => <FeedListItem log={item} />}
      keyExtractor={log => log.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onScroll={onScroll}
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
