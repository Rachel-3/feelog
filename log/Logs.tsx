import AsyncStorage from '@react-native-async-storage/async-storage';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

// AsyncStorage 에 사용될 키
const key = 'logs';


const Logs = {
  
  //로그 데이터를 불러오는 함수
  async get(): Promise<Log[] | null> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) return null; // 저장된 데이터가 없는 경우 null 반환
      const parsed: Log[] = JSON.parse(raw); // Json 형태의 문자열을 객체로 변환
      return parsed; // 변환될 데이터 변환
    } catch (e) {
      throw new Error('Failed to load logs'); // 데이터 로드 실패시 오류 발생
    }
  },

  // 로그 데이터를 저장하는 함수
  async set(data: Log[]): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data)); // 데이터를 Json 평태로 변환하여 저장
    } catch (e) {
      throw new Error('Failed to save logs'); // 데이터 저장 실패시 오류 발생
    }
  },
};

export default Logs;
