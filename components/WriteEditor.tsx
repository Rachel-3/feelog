import React, { useRef } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

// WriteEditor 타입 정의
interface WriteEditorProps {
  title: string;
  body: string;
  onChangeTitle: (title: string) => void;
  onChangeBody: (body: string) => void;
}

function WriteEditor({ title, body, onChangeTitle, onChangeBody }: WriteEditorProps) {
  // body 입력 필드에 접근하기 위한 ref 생성
  const bodyRef = useRef<TextInput>(null);

  return (
    <View style={styles.block}>
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
        onSubmitEditing={() => bodyRef.current?.focus()}
      />
      <TextInput
        placeholder="당신의 오늘은 어땠나요?"
        style={styles.bodyInput}
        multiline //여러줄 입력 가능
        textAlignVertical="top" // 텍스트 상단 정렬
        onChangeText={onChangeBody}
        returnKeyType="next"
        value={body}
        ref={bodyRef} // 본문 입력 필드 참조 설정
      />
    </View>
  );
}

// 스타일 시트 정의
const styles = StyleSheet.create({
  block: { flex: 1, padding: 16 },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: '#263238',
    fontWeight: 'bold',
  },
  bodyInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    color: '#263238',
  },
});

export default WriteEditor;
