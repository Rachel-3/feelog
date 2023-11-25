import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import EmptySearchResult from '../components/EmptySearchResult';
import FeedList from '../components/FeedList';
import LogC, { LogCType } from '../context/LogC';
import SearchC, { SearchCType } from '../context/SearchC';

// Log 타입 정의 ( LogC 컨텍스트에서 정의된 것으로 가정 )
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

function Search() {

  // SearchC 컨텍스트에서 키워드를 가져옴
  const { keyword } = useContext(SearchC) as SearchCType;

  // LogC 컨텍스트에서 로그 리스트 가져옴
  const { logs } = useContext(LogC) as LogCType;

  // 검색어가 비어 있지 않고, 로그 리스트가 있는 경우, 검색어에 따라 로그를 필터링하여 검색 결과를 생성
  const filtered = keyword === ''
    ? []
    : logs.filter((log: Log) =>
        [log.title, log.body].some(text => text.includes(keyword))
      );

  // 검색어가 비어 있는 경우, 검색 결과가 없음을 나타내는 컴포넌트 반환
  if (keyword === '') {
    return <EmptySearchResult type="EMPTY_KEYWORD" />;
  }

  // 검색 결과가 없는 경우, 검색 결과가 없음을 나타내는 컴포넌트 반황
  if (filtered.length === 0) {
    return <EmptySearchResult type="NOT_FOUND" />;
  }

  // 검색 결과가 있는 경우, 검색된 로그를 표시하는 FeedList 컴포넌트 렌더링
  return (
    <View style={styles.block}>
      <FeedList logs={filtered} onScrolledToBottom={() => {/* Implement scrolling logic here */}} />
    </View>
  );
}

// 스타일링 정의
const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
});

export default Search;
