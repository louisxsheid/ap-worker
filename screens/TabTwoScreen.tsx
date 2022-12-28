import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function TabTwoScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tab Two</Text>
            <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
            />
            <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
            <TouchableOpacity
                onPress={() => {
                    signOut(auth);
                }}
                style={styles.button}
            >
                <Text style={{ color: 'black' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%'
    },
    button: {
        backgroundColor: 'lightblue',
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    }
});
