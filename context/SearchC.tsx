import React, { createContext, useState, ReactNode } from 'react';

// SearchContext 타입 정의
export type SearchCType = {
  keyword: string; // 검색 키워드
  onChangeText: (text: string) => void; // 키워드 변경 함수
};

// SearchC 생성시 초기값을 undefined 로 설정
const SearchC = createContext<SearchCType | undefined>(undefined);

// SearchCProvider 컴포넌트의 props 타입 정의
interface SearchCProviderProps {
  children: ReactNode;
}

// SearchCProvider 함수 컴포넌트 정의
export const SearchCProvider: React.FC<SearchCProviderProps> = ({ children }) => {
  const [keyword, setKeyword] = useState<string>('');

  // 키워드 변경 함수
  const onChangeText = (text: string) => {
    setKeyword(text); // 입력된 텍스트로 키워드 상태 업데이트
  };

  // SearchCProvider 컴포넌트를 사용하여 keyword와 onChangeText를 value로 제공
  return (
    <SearchC.Provider value={{ keyword, onChangeText }}>
      {children}
    </SearchC.Provider>
  );
};

export default SearchC;
