import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import Header from "../components/HeaderWithBackButton"
import tw from "tailwind-react-native-classnames"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/core"
import useAuth from "../hooks/useAuth"

const AccountMenuScreen = () => {
    const navigation = useNavigation();

    const { signOut } = useAuth();

    return (
        <View>
            <Header />

            <View style={tw`p-3`}>
                <Text style={tw`text-lg font-bold mb-1`}>Options</Text>

                <View style={tw`border border-gray-300 rounded-lg`}>
                    <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")} style={tw`flex-row items-center justify-between p-4 border-b border-gray-300`}>
                        <Text>Edit Profile</Text>
                        <Icon type="antdesign" name="right" size={20} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={signOut} style={tw`flex-row items-center justify-between p-4`}>
                        <Text>Sign Out</Text>
                        <Icon type="antdesign" name="right" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AccountMenuScreen