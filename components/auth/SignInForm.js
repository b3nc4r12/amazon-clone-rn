import React from "react"
import { View, Text, TextInput, Pressable } from "react-native"
import * as Yup from "yup"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import tw from "tailwind-react-native-classnames"
import useAuth from "../../hooks/useAuth"
import { LinearGradient } from "expo-linear-gradient"
import Spinner from "react-native-loading-spinner-overlay"

const SignInForm = () => {
    const loginSchema = Yup.object().shape({
        email: Yup.string().email("You must enter a valid email address!").required("You must enter an email!"),
        password: Yup.string().required("You must enter a password!").min(8, "Password must be at least 8 characters long."),
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    })

    const { signIn, error, loading } = useAuth();

    if (loading && error) alert(error.message)

    const onSubmit = (data) => signIn(data.email, data.password);

    return (
        <View style={tw`px-4 border border-gray-300 border-t-0 rounded-b-md`}>
            <Spinner
                visible={loading}
                cancelable={false}
                overlayColor="rgba(0, 0, 0, 0.5)"
                textContent={"Loading..."}
                textStyle={tw`text-white`}
            />

            <View style={tw`pb-3`}>
                <Controller
                    control={control}
                    name="email"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`h-10 border ${errors.email ? "border-red-500" : "border-gray-400"} rounded-sm px-3`}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType="email-address"
                            placeholder="Email"
                            {...register("email")}
                        />
                    )}
                />
                {errors.email && <Text style={tw`py-2 text-red-500`}>{errors.email.message}</Text>}
            </View>

            <View style={tw`pb-3`}>
                <Controller
                    control={control}
                    name="password"
                    defaultValue=""
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={tw`h-10 border ${errors.password ? "border-red-500" : "border-gray-400"} rounded-sm px-3`}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            secureTextEntry={true}
                            placeholder="Password"
                            {...register("password")}
                        />
                    )}
                />
                {errors.password && <Text style={tw`py-2 text-red-500`}>{errors.password.message}</Text>}
            </View>

            <LinearGradient colors={["#f7e1ac", "#f0c14c"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={tw`my-2 rounded-md`}>
                <Pressable onPress={handleSubmit(onSubmit)} style={[tw`py-3 rounded-sm border`, { borderColor: "#bea25d" }]}>
                    <Text style={tw`text-center text-base`}>Sign-In</Text>
                </Pressable>
            </LinearGradient>

            <Text style={tw`mt-3 mb-6 text-sm`}>
                <Text>By continuing, you agree to Amazon's </Text>
                <Text style={tw`text-blue-600`}>Conditions of Use</Text>
                <Text> and </Text>
                <Text style={tw`text-blue-600`}>Privacy Notice</Text>
                <Text>.</Text>
            </Text>
        </View>
    )
}

export default SignInForm