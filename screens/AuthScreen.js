import React, { useState } from "react"
import { View, Text } from "react-native"
import Header from "../components/auth/Header"
import { Divider } from "react-native-elements"
import RegisterHeader from "../components/auth/RegisterHeader"
import tw from "tailwind-react-native-classnames"
import SignInHeader from "../components/auth/SignInHeader"
import RegisterForm from "../components/auth/RegisterForm"
import SignInForm from "../components/auth/SignInForm"

const AuthScreen = ({ route }) => {
    const [type, setType] = useState(route.params.type);

    return (
        <View>
            <Header />
            <Divider width={0.5} />
            <View style={tw`px-4 py-2 bg-gray-100`}>
                <Text style={tw`text-2xl pb-2`}>Welcome</Text>
                <View style={tw`bg-white rounded-md`}>
                    <RegisterHeader type={type} setType={setType} />
                    {type == "register" && <RegisterForm />}
                    <SignInHeader type={type} setType={setType} />
                    {type == "login" && <SignInForm />}
                </View>
            </View>
        </View>
    )
}

export default AuthScreen