import React from "react"
import { View, Text, Pressable } from "react-native"
import Header from "../components/account/Header"
import tw from "tailwind-react-native-classnames"
import { LinearGradient } from "expo-linear-gradient"
import FeaturesList from "../components/account/FeaturesList"
import { useNavigation } from "@react-navigation/core"

const AccountScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-white`}>
            {/* Header and Gradient */}
            <LinearGradient colors={["#82d7e3", "#a4e6cf", "#fff"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={tw`h-48 pt-10`}>
                <Header />
                <Text style={tw`text-gray-800 text-2xl text-center font-normal mt-3 w-48 mx-auto`}>Sign in for the best experience</Text>
            </LinearGradient>

            {/* Auth Buttons */}
            <Pressable
                onPress={() => navigation.navigate("AuthScreen", { type: "login" })}
                style={[tw`mt-2 mx-4 h-12 items-center justify-center border rounded-sm`, { backgroundColor: "#f3ce72", borderColor: "#af9146" }]}
            >
                <Text style={tw`text-gray-800`}>Sign In</Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("AuthScreen", { type: "register" })}
                style={[tw`mt-2 mx-4 h-12 items-center justify-center border rounded-sm`, { backgroundColor: "#eef0f3", borderColor: "#8d9096" }]}
            >
                <Text style={tw`text-gray-800`}>Create account</Text>
            </Pressable>

            {/* FeaturesList */}
            <FeaturesList />
        </View>
    )
}

export default AccountScreen