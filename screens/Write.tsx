import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogC, { LogCType } from '../context/LogC';
import { StackNavigationProp } from '@react-navigation/stack';

// 앱의 라우트 및 파라미터 정의
type RootStackParamList = {
  Write: {
    log?: Log;
  };
};
 // Write 스크린의 라우트 파라미터 타입 정의
type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

// Write 스크립의 네비게이션 프로퍼티 타입 정의
type WriteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Write'>;

// 로그 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

function Write() {
  // 현재 라우트와 네비게이션을 가져오기 위해 useRoute와 useNavigation 훅 사용
  const route = useRoute<WriteScreenRouteProp>();
  const navigation = useNavigation<WriteScreenNavigationProp>();

  // 현재 라우트의 'log' 파라미터 가져오기 (log가 있을 수도 없을 수도 있음)
  const log = route.params?.log;

  // 제목, 내용, 날짜 상태 변수 초기화
  const [title, setTitle] = useState<string>(log?.title ?? '');
  const [body, setBody] = useState<string>(log?.body ?? '');
  const [date, setDate] = useState<Date>(log ? new Date(log.date) : new Date());

  // LogC 컨텍스트에서 함수 가져오기
  const { onCreate, onModify, onRemove } = useContext(LogC) as LogCType;

  // 저장 버튼 클릭 시 호출되는 함수
  const onSave = () => {
    if (log) {
      // 기존 로그 수정하는 경우
      onModify({
        id: log.id,
        date: date.toISOString(),
        title,
        body,
      });
    } else {
      // 새로운 로그를 생성하는 경우
      onCreate({
        title,
        body,
        date: date.toISOString(),
      });
    }
    // 화면을 닫고 이전 화면으로 돌아감
    navigation.pop();
  };

  // 삭제 버튼 클릭 시 호출되는 함수
  const onAskRemove = () => {
    Alert.alert(
      '삭제',
      '삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          onPress: () => {
            // 로그 삭제 함수 호출
            onRemove(log?.id?? ' ');
            // 화면을 닫고 이전 화면으로 돌아감
            navigation.pop();
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  return (
    // SafeAreaView 를 사용하여 안전한 화면 영역 설정

    // KeyboardAvoidingView 를 사용하여 키보드가 화면을 가리지 않도록 사용

    // WriteHeader 의 저장, 삭제, 날짜 설정 기능 포함

    // WriteHeader 의 제목 및 내용 작성 기능 포함

    <SafeAreaView style={styles.block}>

      <KeyboardAvoidingView
        style={styles.avoidingView}>

        <WriteHeader
          onSave={onSave}
          onAskRemove={onAskRemove}
          isEditing={!!log}
          date={date}
          onChangeDate={setDate}
        />
        <WriteEditor
          title={title}
          body={body}
          onChangeTitle={setTitle}
          onChangeBody={setBody}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
  avoidingView: {
    flex: 1,
  },
});

export default Write;
