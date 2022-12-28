import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { db, auth } from '../firebase';
import { ref, onValue } from "firebase/database";

export default function JobDetails({
    navigation,
    route
}: any) {
    console.log(route)

    return (
        <View style={styles.container}>
            <View style={styles.jobListWrapper2}>
                <Text style={styles.title}>Job Name: {route.params.job.job_name}</Text>
                <Text style={styles.title}>Date: {route.params.job.date}</Text>
                <Text style={styles.title}>Start Time: {route.params.job.start_time}</Text>
                <Text style={styles.title}>End Time: {route.params.job.end_time}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: "5%"
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: "transparent",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    jobListWrapper: {
        backgroundColor: "#D9D9D9",
        height: "100%",
        width: "100%",
        borderRadius: 10
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 3,
      },
    category_wrapper: { 
        flexDirection: "row",
        backgroundColor: "transparent",
        width: "100%",
        justifyContent: "space-around",
        marginTop: "5%",
    },
    jobList: { 
        backgroundColor: "transparent",
        padding: "5%"
    },
    jobWrap: {
        backgroundColor: "white",
        // width: "100%",
        height: 80,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        marginBottom: "5%",
    },
    jobInfoItem: { 
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    jobListWrapper2: {
        backgroundColor: "#D9D9D9",
        height: "100%",
        width: "100%",
        borderRadius: 10,
    },
});
