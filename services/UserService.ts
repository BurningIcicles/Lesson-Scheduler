import { initializeDatabase } from "@/services/FirestoreService";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore/lite";

export const USER_COLLECTION = 'users';

export interface User {
    name: string;
    phone_number: string;
}

export const addUser = async (userData: Omit<User, 'createdAt' | 'updatedAt'>) => {
    try {
        const app = await initializeDatabase();
        const db = getFirestore(app);
        
        const usersCollection = collection(db, USER_COLLECTION);
        const docRef = await addDoc(usersCollection, {
            ...userData,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return { id: docRef.id, ...userData };
    } catch (error) {
        console.error('Error in addUser function:', error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const app = await initializeDatabase();
        const db = getFirestore(app);

        const usersCollection = collection(db, USER_COLLECTION);
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => {
            const data = doc.data();

            const convertedData = Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                    key,
                    value?.toDate?.() ?? value
                ])
            );

            return {
                id: doc.id,
                ...convertedData
            } as unknown as User;
        });

        return usersList;
    } catch (error) {
        console.error('Error in getUsers function:', error);
        throw error;
    }
}

