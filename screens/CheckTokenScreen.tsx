import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckTokenScreen: React.FC = () => {
    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log('Stored token:', token);
        } catch (error) {
            console.error('Error reading token from AsyncStorage:', error);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Check AsyncStorage Token</Text>
        <Button title="Check Token" onPress={checkToken} />
        </View>
    );
};

export default CheckTokenScreen;
