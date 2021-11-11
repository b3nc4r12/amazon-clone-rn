import React from "react"
import { View, SafeAreaView, TextInput } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"

const Header = () => {
    return (
        <View style={tw`h-28`}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#84d7e2", "#a6e7cd"]} style={tw`flex-1 px-4`}>
                <SafeAreaView>
                    <View style={tw`flex-row items-center bg-white h-10 px-2.5 border border-gray-400 rounded-md mt-2.5 shadow-md`}>
                        <Icon type="ionicon" name="search-sharp" size={22} style={tw`pr-2`} />
                        <TextInput placeholder="Search Amazon" returnKeyType="search" placeholderTextColor="gray" style={tw`text-base h-full flex-1`} />
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </View>
    )
}

export default Header