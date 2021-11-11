import React from "react"
import { View, Text, ScrollView } from "react-native"
import Header from "../components/editProfile/Header"
import tw from "tailwind-react-native-classnames"
import { Divider } from "react-native-elements"
import EditProfileForm from "../components/editProfile/EditProfileForm"

const EditProfileScreen = () => {
    return (
        <View style={tw`flex-1 bg-white`}>
            <Header />

            <ScrollView style={tw`p-5 mb-10`}>
                <View style={tw`items-center`}>
                    <Text style={tw`text-2xl pb-2`}>Customize your public profile</Text>
                    <Divider orientation="vertical" />
                    <Text style={tw`text-center mt-4`}>Public profile allows you to share a little about yourself with other Amazon customers. This is how you'll be shown to other shoppers on Amazon when you post reviews, Q&A, lists and more.</Text>
                </View>

                <EditProfileForm />
            </ScrollView>
        </View>
    )
}

export default EditProfileScreen