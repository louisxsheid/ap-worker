import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';

type loggedInProps = {
    setIsLoggedIn: Dispatch<SetStateAction<Boolean>>;
};

interface Values {
    email: string;
    password: string;
}

// Display Login page and handle login

const Login: any = ({ setIsLoggedIn }: any): JSX.Element => {
    const auth = getAuth();
    const [error, setError] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        setTimeout(() => {
            setError('');
        }, 4000);
    }, [error]);

    const signUserIn = (credentials: Values) => {
        const { email, password } = credentials;
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setIsLoggedIn(true);
            })
            .catch((error: any) => {
                setError(error.message);
            });
    };

    return (
        // <View>
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                source={require('../../assets/images/arrowplumbinglogo.png')}
                style={styles.logo}
            />
            <TextInput
                placeholder="email"
                style={styles.textInput}
                value={email}
                onChangeText={(text: string) => setEmail(text)}
                placeholderTextColor="gray"
            />
            <TextInput
                placeholder="password"
                secureTextEntry
                style={styles.textInput}
                value={password}
                onChangeText={(text: string) => setPassword(text)}
                placeholderTextColor="gray"
            />
            <TouchableOpacity
                onPress={() => {
                    signUserIn({ email, password });
                }}
                style={styles.button}
            >
                <Text>Login</Text>
            </TouchableOpacity>
            <Text style={{ color: 'red' }}>{error}</Text>
        </KeyboardAvoidingView>
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        backgroundColor: 'whitesmoke',
        width: 250,
        height: 40,
        borderWidth: 1,
        borderLeftColor: 'black',
        padding: 10,
        margin: 5
    },
    button: {
        backgroundColor: 'lightblue',
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10
    },
    logo: {
        margin: 10
    }
});

export default Login;
