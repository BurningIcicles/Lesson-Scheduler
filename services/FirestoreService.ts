import {Platform} from "react-native";

if (typeof setImmediate === 'undefined') {
    (global as any).setImmediate = setTimeout;
}

import * as config from './ConfigService';

import { initializeApp } from "firebase/app";

const androidCredentials = {
//     clientId: config.ANDROID_CLIENT_ID,
//     appId: config.ANDROID_APP_ID,
//     apiKey: config.ANDROID_API_KEY,
//     databaseURL: config.ANDROID_DATABASE_URL,
//     storageBucket: config.ANDROID_STORAGE_BUCKET,
//     messagingSenderId: config.ANDROID_MESSAGING_SENDER_ID,
//     projectId: config.ANDROID_PROJECT_ID,
};

const iosCredentials = {
    clientId: config.IOS_CLIENT_ID,
    appId: config.IOS_APP_ID,
    apiKey: config.IOS_API_KEY,
    databaseURL: config.IOS_DATABASE_URL,
    storageBucket: config.IOS_STORAGE_BUCKET,
    messagingSenderId: config.IOS_MESSAGING_SENDER_ID,
    projectId: config.IOS_PROJECT_ID,
};

const webCredentials = {
    apiKey: config.WEB_API_KEY,
    authDomain: config.WEB_AUTH_DOMAIN,
    projectId: config.WEB_PROJECT_ID,
    storageBucket: config.WEB_STORAGE_BUCKET,
    messagingSenderId: config.WEB_MESSAGING_SENDER_ID,
    appId: config.WEB_APP_ID,
    measurementId: config.WEB_MEASUREMENT_ID
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