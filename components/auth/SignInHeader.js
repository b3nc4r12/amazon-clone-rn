import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "tailwind-react-native-classnames"

const SignInHeader = ({ type, setType }) => {
    return (
        <Pressable
            onPress={() => setType("login")}
            style={tw`flex-row items-center h-12 border border-gray-300 ${type == "login" ? "bg-white border-t-0 border-b-0" : "bg-gray-200 rounded-b-md"}`}
        >
            <View style={tw`items-center justify-center bg-white border border-gray-400 rounded-full h-6 w-6 mx-4`}>
                {type == "login" && <View style={tw`bg-yellow-600 rounded-full h-3 w-3`} />}
            </View>
            <Text style={tw`flex-row font-bold`}>
                <Text style={tw`text-sm`}>Sign-In. </Text>
                <Text style={tw`text-xs`}>Already a customer?</Text>
            </Text>
        </Pressable>
    )
}

export default SignInHeader