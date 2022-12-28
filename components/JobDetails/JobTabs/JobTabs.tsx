import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Tab } from './Tab';

export const JobTabs =  ({ setCurrentTab }: any) => {
    return (
            <View style={styles.tabWrapper}>
                <Tab title={"Overview"} setCurrentTab={setCurrentTab} />
                <Tab title={"Client"} setCurrentTab={setCurrentTab} />
                <Tab title={"Time / Material"} setCurrentTab={setCurrentTab} />
                <Tab title={"Notes"} setCurrentTab={setCurrentTab} />
                <Tab title={"Signature"} setCurrentTab={setCurrentTab} />
            </View>
    )
}

const styles = StyleSheet.create({
    container2: {
        // flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: "5%"
    },
    title: {
        // fontSize: 15,
        // fontWeight: 'bold',
        // backgroundColor: "transparent",
    },
    // separator: {
    //     marginVertical: 30,
    //     height: 1,
    //     width: '80%'
    // },
    tabWrapper: {
        // backgroundColor: "red",
        // height: "100%",
        width: "100%",
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    // shadowProp: {
    //     shadowColor: '#171717',
    //     shadowOffset: { width: -2, height: 4 },
    //     shadowOpacity: 0.25,

    //     shadowRadius: 3,
    // },
    category_wrapper: {
        // flexDirection: "row",
        // backgroundColor: "transparent",
        // justifyContent: "space-between",
        // padding: "5%"
    },
    category_tab: {

    }
});