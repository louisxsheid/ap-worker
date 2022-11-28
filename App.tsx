import { StatusBar } from 'expo-status-bar';
import { useState, ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Login from './components/Login/Login';

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCWm3gQEl8SPAdNlav_HR6pmYukTeuKtgQ',
    authDomain: 'apadmin-65397.firebaseapp.com',
    projectId: 'apadmin-65397',
    storageBucket: 'apadmin-65397.appspot.com',
    messagingSenderId: '848676886042',
    appId: '1:848676886042:web:d544316a3efe68de2d23a3'
};

const app = initializeApp(firebaseConfig);
getDatabase(app);
const auth = getAuth(app);

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    auth.onAuthStateChanged((user) =>
        user ? setIsLoggedIn(true) : setIsLoggedIn(false)
    );

    if (!isLoggedIn) {
        return <Login setIsLoggedIn={setIsLoggedIn} />;
    }

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
