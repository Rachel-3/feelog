import {NavigationProp, useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState, useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import TransparentCircleButton from './TransparentCircleButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// 내부 상태를 관리하기 위한 상태처리
interface State {
  mode: 'date' | 'time';
  visible: boolean;
}

// WriteHeader 의 타입 정의
interface WriteHeaderProps {
  onSave: () => void;
  onAskRemove: () => void; // 이름 변경: onRemove -> onAskRemove
  isEditing: boolean;
  date: Date;
  onChangeDate: (date: Date) => void;
}

// Reducer 에서 처리할 액션 타입 정의
type Action = {type: 'open'; mode: 'date' | 'time'} | {type: 'close'};

// Reducer 초기 타입 정의
const initialState: State = {mode: 'date', visible: false};

// Reducer 함수 정의
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return {
        mode: action.mode,
        visible: true,
      };
    case 'close':
      return {
        ...state,
        visible: false,
      };
    default:
      throw new Error('Unhandled action type');
  }
}

//
function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}: WriteHeaderProps) {
  // useNavigation 사용하여 네비게이션 객체 가져오기
  const navigation = useNavigation<any>(); // 'any' 타입은 필요에 따라 구체적인 타입으로 대체될 수 있습니다.
  // 뒤로가기 이벤트 핸들러
  const onGoBack = () => {
    navigation.pop();
  };

  // Reducer 를 사용하여 컴포넌트 상태 관리
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = (mode: 'date' | 'time') => dispatch({type: 'open', mode});
  const close = () => dispatch({type: 'close'});

  // 날짜 선택 후 처리하는 함수
  const onConfirm = (selectedDate: Date) => {
    close();
    onChangeDate(selectedDate);
  };

  // 컴포넌트 렌더링
  return (
    <View style={styles.block}>
      <View style={styles.iconButtonWrapper}>
        <TransparentCircleButton
          onPress={onGoBack}
          name="arrow-back"
          color="#424242"
        />
      </View>
      <View style={styles.buttons}>
        {isEditing && (
          <TransparentCircleButton
            name="delete-forever"
            color="#ef5350"
            hasMarginRight
            onPress={onAskRemove}
          />
        )}
        <TransparentCircleButton
          name="check"
          color="#009688"
          onPress={onSave}
        />
      </View>
      <View style={styles.center}>
        <Pressable onPress={() => open('date')}>
          <Text>{format(new Date(date), 'PPP', {locale: ko})}</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable onPress={() => open('time')}>
          <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
        </Pressable>
      </View>
      <DateTimePickerModal
        isVisible={state.visible}
        mode={state.mode}
        onConfirm={onConfirm}
        onCancel={close}
        date={date}
      />
    </View>
  );
}

// 스타일 시트 정의
const styles = StyleSheet.create({
  block: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButtonWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 8,
  },
  center: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  separator: {
    width: 8,
  },
});

export default WriteHeader;