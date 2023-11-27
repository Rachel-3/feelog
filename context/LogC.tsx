import React, { createContext, useState, useEffect, useRef, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Logs from '../log/Logs';

// Log 타입 정의
type Log = {
  id: string;
  title: string;
  body: string;
  date: string;
};

// LogCType 타입 정의 및 내보내기
export type LogCType = {
  logs: Log[];
  onCreate: (log: Omit<Log, 'id'>) => void;
  onModify: (modified: Log) => void;
  onRemove: (id: string) => void;
};

// 기본값으로 빈 함수와 빈 배열을 제공
const defaultLogCValue: LogCType = {
  logs: [],
  onCreate: () => {},
  onModify: () => {},
  onRemove: () => {},
};

const LogC = createContext<LogCType>(defaultLogCValue);

// LogCProvider 컴포넌트의 props 타입 정의
interface LogCProviderProps {
  children: ReactNode;
}

// LogCProvider 컴포넌트 정의
export const LogCProvider: React.FC<LogCProviderProps> = ({ children }) => {
  const initialLogsRef = useRef<Log[] | null>(null); // 초기 로그 데이터 참조
  const [logs, setLogs] = useState<Log[]>([]); // 로그 데이터 상태


  // 로그 생성 함수
  const onCreate = ({ title, body, date }: Omit<Log, 'id'>) => {
    const log = { id: uuidv4(), title, body, date }; // 새 로그 객체 생성
    setLogs([log, ...logs]); // 상태 업데이트
  };

  // 로그 수정 함수
  const onModify = (modified: Log) => {
    const nextLogs = logs.map(log => log.id === modified.id ? modified : log);
    setLogs(nextLogs); // 상태 업데이트
  };

  // 로그 삭제 함수
  const onRemove = (id: string) => {
    const nextLogs = logs.filter(log => log.id !== id);
    setLogs(nextLogs); // 상태 업데이트
  };

  // 컴포넌트 마운트 시 로그 데이터 불러오기
  useEffect(() => {
    (async () => {
      const savedLogs = await Logs.get();
      if (savedLogs) {
        initialLogsRef.current = savedLogs;
        setLogs(savedLogs); // 로컬 스토리지에서 불러온 로그 데이터로 상태 업데이트
      }
    })();
  }, []);

  // 로그 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (logs === initialLogsRef.current) {
      return; // 초기 불러오기 상태에서 저장하지 않음
    }
    Logs.set(logs);
  }, [logs]);

  return (
    
    // 자식 컴포넌트 렌더링
    <LogC.Provider value={{ logs, onCreate, onModify, onRemove }}>
      {children}
    </LogC.Provider>
  );
}

export default LogC;
