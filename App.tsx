import { StatusBar } from 'expo-status-bar';
import { useState, ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import Login from './components/Login/Login';
// import app from './firebase';
import { auth } from './firebase';

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    auth.onAuthStateChanged((user: any) =>
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
