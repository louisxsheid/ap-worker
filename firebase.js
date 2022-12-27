import { initializeApp } from 'firebase/app';
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

const auth = getAuth(app);

export { auth };