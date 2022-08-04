//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
const Uploadbarogress = () => {
    return (
        <View style={styles.container}>
            <Progress.Bar progress={process} width={500} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
export default Uploadbarogress;
