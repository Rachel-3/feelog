import React, { useContext } from 'react';
import { Pressable, StyleSheet, TextInput, useWindowDimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import SearchC, { SearchCType } from '../context/SearchC';

const SearchHeader: React.FC = () => {
  const { width } = useWindowDimensions(); // 화면 너비 가져오기
  const { keyword, onChangeText } = useContext(SearchC) as SearchCType; // 검색 컨텍스트 사용

  return (
    <View style={[styles.block, { width: width - 32 }]}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChangeText={onChangeText}
        autoFocus
      />
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]} // 버튼 스타일, 눌렸을 때 투명도 조절
        onPress={() => onChangeText('')}>
        <Icon name="times" size={20} color="#9e9e9e" />
      </Pressable>
    </View>
  );
};

// 스타일 시트 정의
const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  button: {
    marginLeft: 8,
  },
});

export default SearchHeader;
