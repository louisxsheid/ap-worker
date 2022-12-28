import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { onValue, ref, get } from 'firebase/database';
import { db } from '../../firebase';
import GoogleMap from '../GoogleMap';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { MdOutlineDateRange} from 'react-icons/md';
import { IoLocationOutline } from 'react-icons/io5';
import { FiInfo } from 'react-icons/fi';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import axios from 'axios';


export const Overview =  ({ route }: any) => {
    const [jobData, setJobData] = useState<any>({});
    const [propertyData, setPropertyData] = useState<any>({});
    const [clientData, setClientData] = useState<any>({});
    const [latLong, setLatLong] = useState<any>({});
    const [formattedAddress, setFormattedAddress] = useState<any>('');
    // console.log(route.params.job)
    const { job } = route.params;

    useEffect(() => {
        onValue(ref(db, job.path), (snapshot) => {
            if(!snapshot.exists()) setJobData({});
            setJobData(snapshot.val());
            get(ref(db, `properties/${snapshot.val().associated_property}`)).then((snapshot) => {
                if(snapshot.exists()) setPropertyData(snapshot.val());
                else setPropertyData({});

                get(ref(db, `clients/${snapshot.val().associated_client}`)).then((snapshot) => {
                    if(snapshot.exists()) setClientData(snapshot.val());
                    else setClientData({});
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        }
        );
    }, []);

    useEffect(() => {
        const mapString = propertyData.address && propertyData.address.split(' ').join('+');
        axios({
            method: 'get',
            url: `https://maps.google.com/maps/api/geocode/json?address=${mapString},San+Diego+California&key=AIzaSyDsE1smyGbgOiWFRivXxIOm04dqKqDeuhA`,
          }).then((response) => {
            setFormattedAddress(response.data.results[0].formatted_address);
            const region = {
                latitude: response.data.results[0].geometry.location.lat,
                longitude: response.data.results[0].geometry.location.lng,
                latitudeDelta: 0.006,
                longitudeDelta: 0.006,
            }
            setLatLong({region: region });
          });
    }, [propertyData.address]);


    return (
        <View style={styles.jobDetailsWrapper}>
            <View style={styles.topWrapper}>
                <View style={styles.jobInfo}>
                    <View>
                        <Text style={styles.jobName}>{job.job_name}</Text>    
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Ionicons name="location-outline" size={25} color="black" />
                        <Text style={[styles.title, styles.address]}>{formattedAddress && formattedAddress}</Text>
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Ionicons name="person-outline" size={25} color="black" />
                        <Text style={styles.title}>{clientData.name}</Text>
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <MaterialIcons name="date-range" size={25} color="black" />
                        <Text style={styles.title}>{job.date}</Text>
                    </View>
                    <View style={styles.jobInfoItemWrap}>
                        <Feather name="info" size={25} color="black" />
                        <Text style={styles.title}>[Status]</Text>
                    </View>
                </View>
                <View style={styles.jobMap}>
                    <MapView style={styles.map} region={latLong.region}>
                        <Marker
                            coordinate={latLong.region}
                            pinColor={"blue"}
                        />
                    </MapView>
                </View>
            </View>
        </View>
    )
};

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
        marginLeft: 4,
        width: "100%",
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
    jobDetailsWrapper: {
        backgroundColor: "transparent",
        height: "100%",
        padding: "2.5%",
    },
    topWrapper: {
        flexDirection: "row",
        height: "30%",
        width: "100%",
    },
    jobInfo: {
        width: "50%",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingRight: "2.5%",
    },
    jobMap: {
        width: "50%",
        height: "100%",
    },
    map: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    jobInfoItemWrap: {
        flexDirection: "row",
        alignItems: "center",
        fontSize: 25
    },
    jiIcon: {
        width: 25
    },
    jobName: {
        fontSize: 28,
        fontWeight: "bold",
    },
    address: { 
        width: "80%",
        fontSize: 12,
    }

});