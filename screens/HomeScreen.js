import React from "react"
import { View, Text, ScrollView, Image } from "react-native"
import Header from "../components/home/Header"
import Carousel from "../components/home/Carousel"
import { Icon } from "react-native-elements"
import { LinearGradient } from "expo-linear-gradient"
import HomeList from "../components/home/HomeList"
import ProductFeed from "../components/home/ProductFeed"
import tw from "tailwind-react-native-classnames"
import useAuth from "../hooks/useAuth"

const HomeScreen = () => {
    const bannerImageUrl = "https://images.squarespace-cdn.com/content/v1/5366733be4b010f4395f8a3e/1567449587977-NKTP0X3BNLAV1QXBD5AC/Audible+Banner.png?format=2500w"

    const { user } = useAuth();

    return (
        <>
            <View style={tw`flex-1 bg-gray-100`}>
                {/* Header */}
                <Header />

                {/* Main Content */}
                <ScrollView style={tw`mb-20`}>
                    <LinearGradient colors={["#b1e6ed", "#c9f1e2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={tw`h-11 flex-row items-center`}>
                        <Icon type="simple-line-icon" name="location-pin" size={20} style={tw`px-2.5`} />
                        <Text style={tw`font-medium`}>Deliver to {user ? `${user.name.split(" ")[0]} - ${user.location && user.location}` : "E1A"}?</Text>
                    </LinearGradient>

                    {/* Carousel */}
                    <Carousel />

                    {/* Home List */}
                    <HomeList />

                    {/* Ad Banner */}
                    <Image source={{ uri: bannerImageUrl }} style={{ width: "100%", height: 70, resizeMode: "stretch", marginBottom: 8 }} />

                    {/* Product Feed */}
                    <ProductFeed />
                </ScrollView>
            </View>
        </>
    )
}

export default HomeScreen