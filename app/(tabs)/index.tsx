import { Button, StyleSheet, View } from 'react-native';

import { addLesson, Lesson, LESSON_STATUS } from '@/services/LessonService';
import { addUser, getUsers, User } from '@/services/UserService';

async function handleAddUser() {
    const user: User = {
        name: "Richies",
        phone_number: "1234567890"
    }

    const result = await addUser(user);
    console.log(result);
}

async function handleGetUsers() {
    const result = await getUsers();
    console.log(result);
}

async function handleAddLesson() {
    const lesson: Lesson = {
        name: "Richies",
        startTime: new Date(),
        length: 100,
        status: LESSON_STATUS.SCHEDULED
    }

    const result = await addLesson(lesson);
    console.log(result);
}

export default function HomeScreen() {
    return (
        <View>
            <Button title={"Add User"} onPress={handleAddUser}></Button>
            <Button title={"Add Lesson"} onPress={handleAddLesson}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
