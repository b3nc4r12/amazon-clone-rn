import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainScreen from "./screens/MainScreen"
import AuthScreen from "./screens/AuthScreen"

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="AuthScreen" component={AuthScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigator