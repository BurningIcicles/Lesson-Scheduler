if (typeof setImmediate === 'undefined') {
    (global as any).setImmediate = setTimeout;
}

import {
    ANDROID_API_KEY,
    ANDROID_APP_ID,
    ANDROID_CLIENT_ID,
    ANDROID_DATABASE_URL,
    ANDROID_MESSAGING_SENDER_ID,
    ANDROID_PROJECT_ID,
    ANDROID_STORAGE_BUCKET,
    IOS_API_KEY,
    IOS_APP_ID,
    IOS_CLIENT_ID,
    IOS_DATABASE_URL,
    IOS_MESSAGING_SENDER_ID,
    IOS_PROJECT_ID,
    IOS_STORAGE_BUCKET,
    WEB_API_KEY,
    WEB_APP_ID,
    WEB_AUTH_DOMAIN, WEB_MEASUREMENT_ID,
    WEB_MESSAGING_SENDER_ID,
    WEB_PROJECT_ID,
    WEB_STORAGE_BUCKET,
} from '@env';

import { initializeApp } from "firebase/app";
import { Platform } from 'react-native';

const androidCredentials = {
    clientId: ANDROID_CLIENT_ID,
    appId: ANDROID_APP_ID,
    apiKey: ANDROID_API_KEY,
    databaseURL: ANDROID_DATABASE_URL,
    storageBucket: ANDROID_STORAGE_BUCKET,
    messagingSenderId: ANDROID_MESSAGING_SENDER_ID,
    projectId: ANDROID_PROJECT_ID,
};

const iosCredentials = {
    clientId: IOS_CLIENT_ID,
    appId: IOS_APP_ID,
    apiKey: IOS_API_KEY,
    databaseURL: IOS_DATABASE_URL,
    storageBucket: IOS_STORAGE_BUCKET,
    messagingSenderId: IOS_MESSAGING_SENDER_ID,
    projectId: IOS_PROJECT_ID,
};

const webCredentials = {
    apiKey: WEB_API_KEY,
    authDomain: WEB_AUTH_DOMAIN,
    projectId: WEB_PROJECT_ID,
    storageBucket: WEB_STORAGE_BUCKET,
    messagingSenderId: WEB_MESSAGING_SENDER_ID,
    appId: WEB_APP_ID,
    measurementId: WEB_MEASUREMENT_ID
  };

let selectedCredentials;
if (Platform.OS === 'ios')
    selectedCredentials = iosCredentials;
else if (Platform.OS === 'android')
    selectedCredentials = androidCredentials;
else
    selectedCredentials = webCredentials;

export const initializeDatabase = async () => {
    try {
        return await initializeApp(selectedCredentials);
    } catch (error) {
        console.error('Firebase initialization error:', error);
        throw error;
    }
};