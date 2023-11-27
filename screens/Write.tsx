import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WriteEditor from '../components/WriteEditor';
import WriteHeader from '../components/WriteHeader';
import LogC, { LogCType } from '../context/LogC';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';


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
  content: string;
  creationDate: string;
};

type DiaryData = {
  title: string;
  body: string;
  date: string;
  userId: string;
};

function Write() {

  const { currentUser } = useAuth(); // 현재 로그인한 사용자 가져오기

  // 현재 라우트와 네비게이션을 가져오기 위해 useRoute와 useNavigation 훅 사용
  const route = useRoute<WriteScreenRouteProp>();
  const navigation = useNavigation<WriteScreenNavigationProp>();

  // 현재 라우트의 'log' 파라미터 가져오기 (log가 있을 수도 없을 수도 있음)
  const log = route.params?.log;

  // 제목, 내용, 날짜 상태 변수 초기화
  const [title, setTitle] = useState<string>(log?.title ?? '');
  const [body, setBody] = useState<string>(log?.content ?? '');
  const [date, setDate] = useState<Date>(log ? new Date(log.creationDate) : new Date());

  // `useContext(LogC)`를 통해 컨텍스트에서 함수들 가져오기
  const logContext = useContext(LogC);

  // 컨텍스트에서 함수들을 가져올 때 옵셔널 체이닝을 사용
const { onCreate, onModify, onRemove } = logContext ?? {};

const saveDiary = async (diaryData: DiaryData) => {
  if (!currentUser) {
      console.error('No user logged in');
      return;
  }

  // 백엔드가 기대하는 형식에 맞춰 데이터를 구조화합니다.
  const formattedData = {
      title: diaryData.title,
      content: diaryData.body, // 'body'를 'content'로 변경
      user: {
          id: diaryData.userId // 'userId'를 'user' 객체 안의 'id'로 변경
      }
  };

  console.log('Sending formatted diary data to backend:', formattedData); // 수정된 데이터 로깅

  try {
      const response = await fetch('http://10.0.2.2:8080/diaries', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData), // 수정된 데이터 사용
      });
      if (!response.ok) throw new Error('Failed to save diary');
      // 응답 처리
  } catch (error) {
      console.error('Error saving diary:', error);
  }
};


    // 기존 일기를 수정하는 함수
    
    const modifyDiary = async (diaryId: string, diaryData: DiaryData) => {
      if (!currentUser) {
          console.error('No user logged in');
          return;
      }
      try {
          const response = await fetch(`http://10.0.2.2:8080/diaries/${diaryId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...diaryData, userId: currentUser.id }),
          });
          if (!response.ok) throw new Error('Failed to modify diary');
          // 응답 처리
      } catch (error) {
          console.error('Error modifying diary:', error);
      }
  };
  
    // 일기를 삭제하는 함수
    const removeDiary = async (diaryId: string) => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/diaries/${diaryId}`, {
          method: 'DELETE',
          headers: {

          },
        });
        if (!response.ok) throw new Error('Failed to delete diary');
        // 삭제 성공 시의 처리 로직
      } catch (error) {
        console.error('Error deleting diary:', error);
      }
    };

  // onSave 함수 내에서 onCreate를 호출합니다.
  const onSave = async () => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }
    // DiaryData를 생성합니다.
    const diaryData: DiaryData = {
      title,
      body,
      date: date.toISOString(),
      userId: currentUser.id,
    };
    // 백엔드에 일기를 저장하는 saveDiary 함수 호출
    await saveDiary(diaryData);
    navigation.goBack();
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
          onPress: async () => {
            if (log && log.id) {
              await removeDiary(log.id);
            }
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
