import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Feelog</Text> {/* 텍스트 <Text> 컴포넌트 내부 */}
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
