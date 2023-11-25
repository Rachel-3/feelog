import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

// 타입 정의
interface CalendarViewProps {
  markedDates: {[key: string]: any}; // 날짜별로 마킹 정보를 담은 객체
  selectedDate: string; // 선택된 날짜
  onSelectDate: (date: string) => void; // 날짜가 선택되었을 때 호출될 함수
}

// 컴포넌트 정의
function CalendarView({ markedDates, selectedDate, onSelectDate }: CalendarViewProps) {

  // 선택된 날짜와 마킹정보를 합친 객체를 생성
  const markedSelectedDates = {
    ...markedDates,
    // key값 동적 할당
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    },
  };

  return (
    // Calender 컴포넌트 렌더링
    <Calendar
      style={styles.calendar}
      markedDates={markedSelectedDates}
      onDayPress={day => {
        console.log('day : ', day); // 선택된 날짜의 정보를 콘솔에 출력
        onSelectDate(day.dateString); // 선택된 날짜를 함수에 전달
      }}
      theme={{
        selectedDayBackgroundColor: '#5709b0', // 선택된 날짜의 배경 색상
        arrowColor: '#5709b0', // 달력 화살표 색상
        dotColor: '#5709b0', // 마크 점 색상
        todayTextColor: '#5709b0', // 오늘 날짜 텍스트 색상
      }}
    />
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
});

export default CalendarView;
