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
import { onValue, ref, get } from 'firebase/database';
import { db } from '../../firebase';
import GoogleMap from '../GoogleMap';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import axios from 'axios';

export const Client = ({ route }: any) => {
    const [clientData, setClientData] = useState<any>({});
    const { job } = route.params;

    useEffect(() => {
        onValue(ref(db, `jobs/${job.id}`), (snapshot) => {
            if (!snapshot.exists()) return
            get(ref(db, `properties/${snapshot.val().associated_property}`))
                .then((snapshot) => {
                    get(ref(db, `clients/${snapshot.val().associated_client}`))
                        .then((snapshot) => {
                            if (snapshot.exists())
                                setClientData(snapshot.val());
                            else setClientData({});
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        });
    }, []);

    return (
        <View style={styles.jobDetailsWrapper}>
            <View style={styles.topWrapper}>
                <View style={[styles.jobInfo, styles.shadowProp]}>
                    <View>
                        <Text style={styles.jobName}>{clientData.name}</Text>
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Ionicons
                            name="location-outline"
                            size={25}
                            color="black"
                        />
                        {/* <Text style={[styles.title, styles.address]}>
                            {formattedAddress && formattedAddress}
                        </Text> */}
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Ionicons
                            name="person-outline"
                            size={25}
                            color="black"
                        />
                        {/* <Text style={styles.title}>{clientData.name}</Text> */}
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <MaterialIcons
                            name="date-range"
                            size={25}
                            color="black"
                        />
                        {/* <Text style={styles.title}>{jobData.assigned && jobData.assigned.time.date}</Text> */}
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Feather name="info" size={25} color="black" />
                        {/* <Text style={styles.title}>[Status]</Text> */}
                    </View>
                </View>
                <View style={[styles.jobMap, styles.shadowProp]}>
                    {/* <MapView style={styles.map} region={latLong.region}>
                        <Marker coordinate={latLong.region} pinColor={'blue'} />
                    </MapView> */}
                </View>
            </View>
            <View style={styles.bottomWrapper}>
                    <Text style={styles.jobDescriptionTitle}>
                        Description 
                    </Text>
                <View style={[styles.descWrapper, styles.shadowProp]}>
                    {/* <Text style={styles.jobDescription}>
                            {jobData.description}
                    </Text> */}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5%'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        marginLeft: 4,
        width: '100%'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    jobListWrapper: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 3
    },
    category_wrapper: {
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'space-around',
        marginTop: '5%'
    },
    jobList: {
        backgroundColor: 'transparent',
        padding: '5%'
    },
    jobWrap: {
        backgroundColor: 'white',
        // width: "100%",
        height: 80,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '5%'
    },
    jobInfoItem: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    jobListWrapper2: {
        backgroundColor: '#D9D9D9',
        height: '100%',
        width: '100%',
        borderRadius: 10
    },
    jobDetailsWrapper: {
        backgroundColor: 'transparent',
        height: '100%',
        padding: '2.5%'
    },
    topWrapper: {
        flexDirection: 'row',
        height: '30%',
        width: '100%'
    },
    jobInfo: {
        width: '49%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: '2.5%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: '1%'
    },
    jobMap: {
        width: '49%',
        marginLeft: '1%',
        height: '100%'
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    jobInfoItemWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 25
    },
    jiIcon: {
        width: 25
    },
    jobName: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    address: {
        width: '80%',
        fontSize: 12
    },
    jobDescription: {
        fontSize: 18,
        // fontWeight: 'bold',
        // marginTop: '2.5%'
    },
    jobDescriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "gray",
        // marginTop: '5%'
    },
    bottomWrapper: {
        height: '70%',

        marginTop: '5%',
        // backgroundColor: 'red'
    }
    ,descWrapper: {
        backgroundColor: 'white',
        // height: '100%',
        marginTop: '2%',
        padding: '2.5%',
        borderRadius: 10
    }
});
