import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';


type UserType = {
    id: string;
};

type AuthContextType = {
    currentUser: UserType | null;
    setCurrentUser: (user: UserType | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    setCurrentUser: () => {}
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                const decoded = jwtDecode(token);
                // 백엔드에서 사용하는 필드명으로 수정
                const userId = decoded.sub; // 예: 'sub' 필드 사용
                if (userId) {
                    setCurrentUser({ id: userId });
                } else {
                    console.error('Invalid token: No user ID field');
                }
            }
        } catch (error) {
            console.error('Error checking token:', error);
        }
    };
    
    

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
