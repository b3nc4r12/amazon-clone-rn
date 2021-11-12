import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import MainScreen from "./screens/MainScreen"
import AuthScreen from "./screens/AuthScreen"
import useAuth from "./hooks/useAuth"
import EditProfileScreen from "./screens/EditProfileScreen"
import AccountMenuScreen from "./screens/AccountMenuScreen"
import ProductScreen from "./screens/ProductScreen"

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MainScreen">
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
            <Stack.Screen name="AccountMenuScreen" component={AccountMenuScreen} />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            {!user && <Stack.Screen name="AuthScreen" component={AuthScreen} />}
        </Stack.Navigator>
    )
}

export default StackNavigator