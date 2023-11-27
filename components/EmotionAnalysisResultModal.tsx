import React, {useState, useEffect} from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface EmotionData {
    positive: number;
    neutral: number;
    negative: number;
}

interface EmotionAnalysisResultModalProps {
    visible: boolean;
    emotionData: EmotionData;
    onClose: () => void;
    diaryId: number; // 사용자가 선택한 일기의 ID
    selectedSentiment: string; // 사용자가 선택한 감정(sentiment)
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 변경된 불투명 배경
    },
    modalContent: {
        backgroundColor: 'white', // 하얀색 배경 설정
        borderRadius: 20, // 모달의 모서리를 둥글게
        padding: 20,
        alignItems: 'center',
        width: '80%', // 모달의 가로 길이를 화면의 80%로 설정
        shadowColor: '#000', // 그림자 색상
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // 안드로이드 그림자 설정
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 18
    },
    emotionView: {
        alignItems: 'center',
        marginHorizontal: 10
    },
    icon: {
        fontSize: 40,
        padding: 14,
        opacity: 0.5, // 디폴트 투명도 설정
    },
    highlighted: {
        opacity: 1, // 강조된 이모티콘의 투명도 제거
    },
    emotionScore: {
        color: '#1c1c1c',
        fontSize: 16
    },

    closeButton: {
        backgroundColor: '#5709b0',
        marginTop: 215,
        padding: 10,
        borderRadius: 7,
        height: 38,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonText: {
        color: 'white'
    }
});

const EmotionAnalysisResultModal: React.FC<EmotionAnalysisResultModalProps> = (
  { visible, emotionData, onClose, diaryId, selectedSentiment }
) => {
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState < string | null > (null);

    const fetchFeedback = async () => {
        try {
            console.log('Fetching feedback for diary ID:', diaryId); // diaryId 출력
            setIsLoading(true);
            const response = await fetch(`http://10.0.2.2:8080/diaries/${diaryId}/feedback?sentiment=${selectedSentiment}`);

            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다');
            }
            const data = await response.json();
            setFeedback(data.feedbackText);
        } catch (err) {
            const error = err as Error;
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
      if (visible && diaryId && selectedSentiment) { // diaryId와 selectedSentiment가 유효한 경우에만 fetchFeedback 호출
        fetchFeedback();
      }
    }, [visible, diaryId, selectedSentiment]); // useEffect 의존성 배열에 selectedSentiment 추가
  
    // 감정 데이터 유효성 검사
    if (!emotionData || emotionData.positive == null || emotionData.neutral == null || emotionData.negative == null) {
        return (< Modal visible = {
            visible
        }
        transparent animationType = "fade" onRequestClose = {
            onClose
        } > <View style = {
            styles.modalContainer
        } > <Text> 감정 데이터가 없습니다.</Text> {/* 닫기 버튼 등 추가적인 UI 요소 */
        }</View></Modal>);
    }

    const getHighlightedEmotion = () => {
        const {positive, neutral, negative} = emotionData;
        if (positive >= neutral && positive >= negative) {
            return 'positive';
        } else if (negative >= neutral) {
            return 'negative';
        } else {
            return 'neutral';
        }
    };

    const highlightedEmotion = getHighlightedEmotion();

    return (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* 이모티콘 컨테이너 */}
              <View style={styles.iconsContainer}>
                <View style={styles.emotionView}>
                  <Text style={[styles.icon, highlightedEmotion === 'positive' && styles.highlighted]}>
                    😊
                  </Text>
                  <Text style={styles.emotionScore}>
                    {`${emotionData.positive.toFixed(1)}%`}
                  </Text>
                </View>
                <View style={styles.emotionView}>
                  <Text style={[styles.icon, highlightedEmotion === 'neutral' && styles.highlighted]}>
                    😐
                  </Text>
                  <Text style={styles.emotionScore}>
                    {`${emotionData.neutral.toFixed(1)}%`}
                  </Text>
                </View>
                <View style={styles.emotionView}>
                  <Text style={[styles.icon, highlightedEmotion === 'negative' && styles.highlighted]}>
                    😢
                  </Text>
                  <Text style={styles.emotionScore}>
                    {`${emotionData.negative.toFixed(1)}%`}
                  </Text>
                </View>
              </View>
              {/* 피드백 표시 */}
          {isLoading ? (
            <Text>로딩 중...</Text>
          ) : error ? (
            <Text>오류 발생 : {error}</Text>
          ) : (
            <Text>피드백 : {feedback}</Text>
          )}

          {/* 닫기 버튼 */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmotionAnalysisResultModal;