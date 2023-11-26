import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Feelog</Text> {/* 텍스트는 반드시 <Text> 컴포넌트 내부에 있어야 합니다 */}
        </View>
    );
};

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ededed',
    },
    text: {
        fontSize: 24,
        color: '#000000',
    },
});

export default LoadingScreen;
