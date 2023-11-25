import React, { useContext, useMemo, useState } from 'react';
import { format } from 'date-fns';
import CalendarView from '../components/CalendarView';
import FeedList from '../components/FeedList';
import LogC, { LogCType } from '../context/LogC';

function Calendar() {

  // LogC 컨텍스트에서 logs 데이터 가져옴
  const { logs } = useContext(LogC) as LogCType;

  // 현재 날짜를 yyyy-MM-dd 형식으로 포맷하여 setSelectedDate 상태 설정
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));

  // 로그 데이터에서 날짜별로 markedDates 객체 계산
  const markedDates = useMemo(() => {
    return logs.reduce((acc: { [key: string]: { marked: boolean } }, log) => {
      const formattedDate = format(new Date(log.date), 'yyyy-MM-dd');
      acc[formattedDate] = { marked: true }; // 해당 날짜에 로그가 있을 경우 표시 방법
      return acc;
    }, {});
  }, [logs]);

  // 선택된 날짜에 해당하는 로그 필터링
  const filteredLogs = logs.filter(log => format(new Date(log.date), 'yyyy-MM-dd') === selectedDate);

  // 스크롤이 하단에 도달했을 때 호출되는 함수
  const onScrolledToBottom = (isBottom: boolean) => {
    if (isBottom) {
      console.log("스크롤이 리스트 하단에 도달했습니다.");
    }
  };

  return (
    // CalendarView 컴포넌트에 markedDates 와 selectedDate 를 전달하여 달력 렌더링
    <FeedList
      logs={filteredLogs}
      ListHeaderComponent={
        <CalendarView
          markedDates={markedDates} 
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate} // 날짜 선택 시 setSelectedDate 업데이트
        />
      }
      onScrolledToBottom={onScrolledToBottom} // 스크롤 처리 로직을 FeedList에 전달
    />
  );
}

export default Calendar;