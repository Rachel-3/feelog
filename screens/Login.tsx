import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Alert, TouchableOpacity, Text } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './Root';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Login 타입 정의
interface LoginProps {
  navigation: NavigationProp<RootStackParamList>; // navigation prop 추가
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      Alert.alert("오류", "올바르지 않은 이메일입니다.");
      return;
    }
  
    try {
      const response = await fetch('http://10.0.2.2:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      if (response.status === 200) {
        const token = await response.text();
        await AsyncStorage.setItem('userToken', token);
        Alert.alert('로그인 성공', '환영합니다!', [
          { text: 'OK', onPress: () => navigation.navigate('MainTab', { screen: 'Feed' }) }
        ]);
      } else {
        // 서버 응답 코드를 기반으로 오류 메시지 설정
        let errorMessage = '로그인 실패';
        if (response.status === 401) {
          errorMessage = '잘못된 이메일 또는 비밀번호입니다.';
        } else if (response.status === 500) {
          errorMessage = '서버 오류가 발생했습니다.';
        }
        Alert.alert('로그인 실패', errorMessage);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('로그인 실패', '네트워크 오류 또는 알 수 없는 오류가 발생했습니다.');
    }
  };

  const handleGoToSignup = () => {
    navigation.navigate('Signup'); // 회원가입 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToSignup} style={styles.switchButton}>
        <Text style={styles.switchButtonText}>계정이 없으신가요? 회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  title: {
    fontSize: 16, // 폰트 크기
    fontWeight: 'bold', // 폰트 굵기
    marginBottom: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: 219,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#5709b0',
    padding: 10,
    borderRadius: 5,
    width: 220,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  switchButton: {
    marginTop: 1,
    padding: 1,
  },
  switchButtonText: {
    fontSize: 12,
  },
});

export default Login;