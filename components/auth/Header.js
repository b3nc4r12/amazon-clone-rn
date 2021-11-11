import React from "react"
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import tw from "tailwind-react-native-classnames"
import { useNavigation } from "@react-navigation/core"

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={tw`h-24`}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#84d7e2", "#a6e7cd"]} style={tw`flex-1 px-4`}>
                <SafeAreaView style={tw`h-full flex-row items-center justify-between`}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={tw`text-base font-medium`}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={tw`text-lg font-bold`}>Amazon</Text>
                    <Text style={tw`text-base font-medium text-transparent`}>Cancel</Text>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

export default Header