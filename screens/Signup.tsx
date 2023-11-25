import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './Root';

interface SignupProps {
  navigation: NavigationProp<RootStackParamList>; // 타입을 RootStackParamList로 지정
}

const Signup: React.FC<SignupProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      Alert.alert("Error", "올바르지 않은 이메일입니다.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "비밀번호가 일치하지 않습니다.");
      return;
    }

    Alert.alert("회원가입 완료", "회원가입이 성공적으로 완료되었습니다.", [
      { text: "OK", onPress: () => navigation.navigate('Login') } // 로그인 화면으로 이동
    ]);
    
    console.log('회원가입', email, username, password, confirmPassword);
  };

  const handleGoToLogin = () => {
    navigation.goBack(); // 이전 화면 (로그인 화면)으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>

      <TextInput
        style={styles.input}
        placeholder="이름"
        value={username}
        onChangeText={setUsername}
        keyboardType="default"
      />
      <TextInput
        style={styles.input}
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
    
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoToLogin} style={styles.switchToLoginButton}>
        <Text style={styles.switchToLoginButtonText}>이미 계정이 있나요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: 219,
    height: 40,
    padding: 9,
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
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  switchToLoginButton: {
    marginTop: 1,
    padding: 1,
  },
  switchToLoginButtonText: {
    fontSize: 12,
  },
});

export default Signup;