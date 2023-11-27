import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface FloatingWriteButtonProps {
  hidden: boolean;
  onPress: () => void; // onPress 함수 추가
}

const FloatingWriteButton: React.FC<FloatingWriteButtonProps> = ({ hidden, onPress }) => {
  // 애니메이션 상태 관리
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // hidden 상태에 따라 애니메이션 효과 적용
    Animated.spring(animation, {
      toValue: hidden ? 1 : 0,
      useNativeDriver: true,
      tension: 45,
      friction: 5,
    }).start();
  }, [animation, hidden]);

  return (
    <Animated.View style={[styles.wrapper, { 
      transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [0, 88] }) }],
      opacity: animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] })
    }]}>
      <Pressable style={styles.button} android_ripple={{color: 'white'}} onPress={onPress}>
        <Icon name="add" size={24} style={styles.icon} />
      </Pressable>
    </Animated.View>
  );
};

// 스타일 시트 정의
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5709b0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4d4d4d',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
});

export default FloatingWriteButton;
