import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    ScrollView
} from 'react-native';

export const Tab = ({ title, setCurrentTab }: any) => {
    return (
        <TouchableOpacity onPress={() => setCurrentTab(title)}>
            <View style={styles.category_tab}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    category_tab: {
        backgroundColor: '#C4C4C4',
        padding: 10,
        borderRadius: 10
    },
    title: {}
});
