import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FeedList from '../components/FeedList';
import FloatingWriteButton from '../components/FloatingWriteButton';
import LogC, { LogCType } from '../context/LogC';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

function Feed() {

  // LogC 컨텍스트 사용
  const { logs } = useContext(LogC) as LogCType;

  // 버튼 숨김 여부를 관리하는 상태 변수
  const [hidden, setHidden] = useState<boolean>(false);

  // FeedList 에서 스크롤이 화면 하단에 도달하면 호출되는 롤백 함수
  const onScrolledToBottom = (isBottom: boolean) => {
    // isBottom 값에 따라 FloatingWriteButton을 표시 또는 숨김
    setHidden(isBottom); 
  };

  return (

    // FeedList 컴포넌트를 렌더링하고 목록 로그를 전달
    // 화면 하단에 위치한 FloatingWriteButton 컴포넌트를 렌더링하며, 버튼의 숨김 여부를 속성으로 전달

    <View style={styles.block}>
      <FeedList logs={logs} onScrolledToBottom={onScrolledToBottom} />

      <FloatingWriteButton hidden={hidden} />
    </View>
  );
}

// 스타일 정의 
const styles = StyleSheet.create({
  block: {
    flex: 1, // 화면을 꽉채우도록
  },
});

export default Feed;
