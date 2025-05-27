import { addLesson, Lesson, LESSON_STATUS } from '@/services/LessonService';
import { addUser, getUsers, User } from '@/services/UserService';
import React from "react";
import { Button, View } from 'react-native';

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
        <View className="flex-1 items-center justify-center bg-red-500">
            <Button title="Add User" onPress={handleAddUser} />
            <Button title="Add Lesson" onPress={handleAddLesson} />
        </View>
    );
}

