import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import EmotionAnalysisResultModal from './EmotionAnalysisResultModal'; 

// Log 타입 정의 (감정 데이터 필드 추가)
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
  emotions?: { // 감정 데이터 필드 추가
    positive: number;
    neutral: number;
    negative: number;
  };
};

// EmotionData 타입 정의
type EmotionData = {
  positive: number;
  neutral: number;
  negative: number;
};

// EmotionAnalysisResultModalProps 인터페이스 정의
interface EmotionAnalysisResultModalProps {
  visible: boolean;
  emotionData: EmotionData;
  onClose: () => void;
  diaryId: number;
  selectedSentiment: 'positive' | 'neutral' | 'negative';
}

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
function formatDate(dateString?: string): string {
  if (!dateString) {
    return '날짜 정보 없음';
  }

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
  if (text) {
    return text.length > 100 ? `${text.substring(0, 97)}...` : text;
  }
  return '';
}

// FeedListItem 컴포넌트
const FeedListItem: React.FC<FeedListItemProps> = ({ log }) => {
  const navigation = useNavigation<FeedListItemNavigationProp>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [emotionData, setEmotionData] = useState<EmotionData>({ positive: 0, neutral: 0, negative: 0 });


  // 로그의 body가 정의되지 않았을 경우를 대비한 처리
  const bodyText = log.body || '내용 없음';

  // 로그 아이템 선택 시 Write 화면으로 이동
  const onPress = () => {
    navigation.navigate('Write', { log });
  };

  

  // 감정 점수가 가장 높은 감정을 반환하는 함수
  function getHighestSentiment(emotionData: EmotionData): 'positive' | 'neutral' | 'negative' {
    const { positive, neutral, negative } = emotionData;
    if (positive >= neutral && positive >= negative) {
      return 'positive';
    } else if (negative >= neutral && negative >= positive) {
      return 'negative';
    } else {
      return 'neutral';
    }
  }
  
  // 감정 분석 결과 확인 버튼 클릭 핸들러
  const onAnalysisPress = async () => {
    try {
      // 백엔드 API 호출을 통해 감정 데이터 가져오기
      const response = await fetch(`http://10.0.2.2:8080/diaries/${log.id}/emotions`);
      if (!response.ok) {
        throw new Error('감정 데이터 조회 실패');
      }
      const emotionsData = await response.json();
      setEmotionData({
        positive: emotionsData.positiveScore,
        neutral: emotionsData.neutralScore,
        negative: emotionsData.negativeScore,
      });
      setModalVisible(true);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <Pressable
        style={styles.block}
        android_ripple={{ color: '#ededed' }}
        onPress={onPress}>
        <Text style={styles.date}>{formatDate(log.date)}</Text>
        <Text style={styles.title}>{log.title}</Text>
        {/* 여기서 truncate 함수를 호출하여 본문 텍스트를 축약 */}
        <Text style={styles.body}>{truncate(bodyText)}</Text>
        {/* 감정 분석 버튼 추가 */}
        <TouchableOpacity style={styles.analysisButton} onPress={onAnalysisPress}>
          <Text style={styles.analysisButtonText}>결과 확인</Text>
        </TouchableOpacity>
      </Pressable>
      <EmotionAnalysisResultModal
        visible={isModalVisible}
        emotionData={emotionData}
        onClose={() => setModalVisible(false)}
        diaryId={parseInt(log.id, 10)} // diaryId는 정수로 변환해야 합니다. parseInt 사용
        selectedSentiment={getHighestSentiment(emotionData)} // 가장 높은 감정을 계산하는 함수를 호출하여 해당 값을 전달
      />
    </>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexDirection: 'row', // flexDirection 추가
    alignItems: 'center', // alignItems 추가
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
    flex: 1, // body 스타일 수정
  },
  // 추가된 버튼 스타일
  analysisButton: {
    marginLeft: 10,
    backgroundColor: '#5709b0',
    padding: 8,
    borderRadius: 5,
  },
  analysisButtonText: {
    color: 'white',
  },
});

export default FeedListItem;
