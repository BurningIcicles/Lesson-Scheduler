import { initializeDatabase } from "@/services/FirestoreService";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore/lite";

const LESSON_COLLECTION = 'lessons';

export const LESSON_STATUS = {
    SCHEDULED: 'scheduled',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
} as const;

export type LessonStatus = typeof LESSON_STATUS[keyof typeof LESSON_STATUS];

export interface Lesson {
    name: string;
    description?: string;
    startTime: Date;
    length: number;
    status: LessonStatus;
}

export const addLesson = async (lessonData: Omit<Lesson, 'createdAt' | 'updatedAt'>) => {
    try {
        const app = await initializeDatabase();
        const db = getFirestore(app);

        const lessonsCollection = collection(db, LESSON_COLLECTION);
        const docRef = await addDoc(lessonsCollection, {
            ...lessonData,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        return { id: docRef.id, ...lessonData };
    } catch (error) {
        console.error('Error in addLesson function:', error);
        throw error;
    }
}

export const getLessons = async (): Promise<Lesson[]> => {
    try {
        const app = await initializeDatabase();
        const db = getFirestore(app);

        const lessonsCollection = collection(db, LESSON_COLLECTION);
        const lessonsSnapshot = await getDocs(lessonsCollection);
        const lessonsList = lessonsSnapshot.docs.map(doc => {
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
            } as unknown as Lesson;
        });
        return lessonsList;
    } catch (error) {
        console.error('Error in getLessons function:', error);
        throw error;
    }
}

export const getLesson = async (query: { id?: string; name?: string }): Promise<Lesson | null> => {
    try {
        const app = await initializeDatabase();
        const db = getFirestore(app);

        const lessonsCollection = collection(db, LESSON_COLLECTION);
        const lessonsSnapshot = await getDocs(lessonsCollection);
        
        // Find the first lesson that matches the query
        const lessonDoc = lessonsSnapshot.docs.find(doc => {
            const data = doc.data();
            if (query.id && doc.id === query.id) return true;
            if (query.name && data.name === query.name) return true;
            return false;
        });

        if (!lessonDoc) return null;

        const data = lessonDoc.data();
        const convertedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [
                key,
                value?.toDate?.() ?? value
            ])
        );

        return {
            id: lessonDoc.id,
            ...convertedData
        } as unknown as Lesson;
    } catch (error) {
        console.error('Error in getLesson function:', error);
        throw error;
    }
}