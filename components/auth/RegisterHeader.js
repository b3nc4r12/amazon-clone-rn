import React from "react"
import { View, Text, Pressable } from "react-native"
import tw from "tailwind-react-native-classnames"

const RegisterHeader = ({ type, setType }) => {
    return (
        <Pressable
            onPress={() => setType("register")}
            style={tw`flex-row items-center h-12 rounded-t-md border border-gray-300 ${type == "register" ? "bg-white border-b-0" : "bg-gray-200"}`}
        >
            <View style={tw`items-center justify-center bg-white border border-gray-400 rounded-full h-6 w-6 mx-4`}>
                {type == "register" && <View style={tw`bg-yellow-600 rounded-full h-3 w-3`} />}
            </View>
            <Text style={tw`flex-row font-bold`}>
                <Text style={tw`text-sm`}>Create account. </Text>
                <Text style={tw`text-xs`}>New to Amazon?</Text>
            </Text>
        </Pressable>
    )
}

export default RegisterHeader