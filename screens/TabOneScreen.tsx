import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { db, auth } from '../firebase';
import { ref, onValue } from "firebase/database";

export default function TabOneScreen({
    navigation
}: RootTabScreenProps<'TabOne'>) {
    const [currentUser, setCurrentUser] = useState<any>({});
    const user = auth.currentUser;
    const userId = user?.uid;
    // console.log(user)
    // const activeJobs = ref(db, `workers/${userId}/activeJobs`);
    const workersRef = ref(db, `workers`);
    useEffect(() => {
        console.log("yikes")
        onValue(workersRef, (snapshot) => {
            if(!snapshot.exists()) return;
            const data = snapshot.val();
            for(const [key, value] of Object.entries(data)) {
                //@ts-ignore
                for(const [key2, value2] of Object.entries(value)) {
                    if(value2 == userId) {
                        setCurrentUser(value);
                        break;
                    }
                }
            }
        })
    }, []);

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Today</Text> */}
            <View style={[styles.jobListWrapper, styles.shadowProp]}>
                <View style={styles.category_wrapper}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.title}>Time</Text>
                    <Text style={styles.title}>Status</Text>
                </View>
                <View style={styles.jobList}>
                    {currentUser.active_jobs && currentUser.active_jobs.map((job: any) => {
                      
                        return (
                            <TouchableOpacity onPress={() => {
                                //@ts-ignore
                                navigation.navigate("Jobs", {
                                    screen: 'JobDetails',
                                    params: { job: job },
                                  })
                            }}>
                                <View style={[styles.jobWrap, styles.shadowProp]}>
                                    <Text style={[styles.title, styles.jobInfoItem]}>{job.job_name}</Text>
                                    <View style={[styles.title, styles.jobInfoItem]}>
                                        <Text>{job.date}</Text>
                                        <Text>{job.start_time} - {job.end_time}</Text>
                                    </View>
                                    <Text style={[styles.title, styles.jobInfoItem]}>TBA</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
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
    }
});
