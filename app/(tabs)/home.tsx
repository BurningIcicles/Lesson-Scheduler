import { addLesson, Lesson, LESSON_STATUS } from '@/services/LessonService';
import { addUser, getUsers, User } from '@/services/UserService';
import React from "react";
import { Text } from 'react-native';

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
        <Text className={"bg-white"}>
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </Text>
        // <View className="flex-1 items-center justify-center bg-white">
        //     <Pressable onPress={handleAddUser} className={"bg-blue-500 p-8"}>
        //         <Text>Add User</Text>
        //     </Pressable>
        //     <Pressable onPress={handleAddLesson} className={"bg-blue-500 p-8"}>
        //         <Text>Add Lesson</Text>
        //     </Pressable>
        // </View>
    );
}

