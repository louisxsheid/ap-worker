import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

import { db, auth } from '../firebase';
import { ref, onValue, get } from 'firebase/database';

export default function TabOneScreen({
    navigation
}: RootTabScreenProps<'TabOne'>) {
    const [currentUser, setCurrentUser] = useState<any>({});
    const [activeJobs, setActiveJobs] = useState<any>([]);
    const user = auth.currentUser;
    const userId = user?.uid;
    const workersRef = ref(db, `workers`);

    useEffect(() => {
        onValue(workersRef, (snapshot) => {
            console.log('inside')
            // let currentUser;
            if (!snapshot.exists()) return;
            const data = snapshot.val();
            for (const [_, value] of Object.entries(data)) {
                //@ts-ignore
                for (const [_, value2] of Object.entries(value)) {
                    if (value2 == userId) {
                        // currentUser = value;
                        setCurrentUser(value);
                        break;
                    }
                }
            }
            //@ts-ignore
        });
    }, []);

    useEffect(() => {
        const activeJobsRef = ref(db, `workers/${currentUser.id}/active_jobs`);
        get(activeJobsRef).then( (snapshot) => {
            if (!snapshot.exists()) return;
            const data = snapshot.val();
            const activeJobs: any = [];
            for (const [_, value] of Object.entries(data)) {
                activeJobs.push(value);
            }
            console.log("activeJobs ", activeJobs)
            setActiveJobs(activeJobs);
         });
    }, [currentUser]);

    return (
        <View style={styles.container}>
            <View style={[styles.jobListWrapper, styles.shadowProp]}>
                <View style={styles.category_wrapper}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.title}>Time</Text>
                    <Text style={styles.title}>Status</Text>
                </View>
                <View style={styles.jobList}>
                    {activeJobs &&
                        activeJobs.map((job: any) => {
                            return (
                                <TouchableOpacity
                                    key={activeJobs.indexOf(job)}
                                    onPress={() => {
                                        //@ts-ignore
                                        navigation.navigate('Jobs', {
                                            screen: 'JobDetails',
                                            params: { job: job }
                                        });
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.jobWrap,
                                            styles.shadowProp
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.title,
                                                styles.jobInfoItem
                                            ]}
                                        >
                                            {job.job_name}
                                        </Text>
                                        <View
                                            style={[
                                                styles.title,
                                                styles.jobInfoItem
                                            ]}
                                        >
                                            <Text>{job.date}</Text>
                                            <Text>
                                                {job.start_time} -{' '}
                                                {job.end_time}
                                            </Text>
                                        </View>
                                        <Text
                                            style={[
                                                styles.title,
                                                styles.jobInfoItem
                                            ]}
                                        >
                                            TBA
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
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
        padding: '2.5%'
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
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
        marginTop: '2.5%'
    },
    jobList: {
        backgroundColor: 'transparent',
        padding: '2.5%'
    },
    jobWrap: {
        backgroundColor: 'white',
        height: 100,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '2.5%'
    },
    jobInfoItem: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    }
});
