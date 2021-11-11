import React from "react"
import { View, Text, Image } from "react-native"
import tw from "tailwind-react-native-classnames"

const data = [
    {
        text: "Check order status and track, change or return items",
        image: "https://i.ibb.co/JcmJbL2/IMG-0495.jpg"
    },
    {
        text: "Shop past purchases and everyday essentials",
        image: "https://i.ibb.co/7zchqvz/IMG-0492.jpg"
    },
    {
        text: "Create lists with items you want, now or later",
        image: "https://i.ibb.co/6sY5HGF/IMG-0496.jpg"
    }
]

const FeaturesList = () => {
    return (
        <View style={tw`mt-8 px-5`}>
            {data.map((item, index) => (
                <View key={index} style={tw`flex-row items-center mb-6`}>
                    <Image source={{ uri: item.image }} style={{ height: 80, width: 80, resizeMode: "contain" }} />
                    <Text style={tw`flex-1 text-lg ml-4 text-gray-800`}>{item.text}</Text>
                </View>
            ))}
        </View>
    )
}

export default FeaturesList