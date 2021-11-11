import React, { useState } from "react"
import { View, Text, Image } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"

const Product = ({ id, title, price, category, image, rating }) => {
    const [hasPrime] = useState(Math.random() < 0.5);

    const truncate = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + "..." : string
    }

    return (
        <View style={[tw`flex-row items-center w-full bg-white px-2.5 mb-1.5 shadow-md`, { height: 175 }]}>
            <View>
                <Image source={{ uri: image }} style={{ height: 100, width: 100, resizeMode: "contain" }} />
            </View>
            <View style={[tw` ml-5 py-5`, { width: "65%" }]}>
                <Text style={tw`text-xs text-gray-500`}>{category}</Text>
                <Text style={{ fontSize: 15, marginTop: 3 }}>{truncate(title, 75)}</Text>
                <View style={tw`flex-row mt-1`}>
                    {Array(parseInt(rating.rate)).fill().map((_, i) => (
                        <Icon key={i} type="antdesign" name="star" size={16} color="rgba(245, 158, 11, 1)" />
                    ))}
                    <Text style={tw`ml-1 text-gray-700 font-light text-xs`}>{rating.count}</Text>
                </View>
                <Text style={tw`text-lg`}>
                    {new Intl.NumberFormat("en-ca", {
                        style: "currency",
                        currency: "CAD",
                    }).format(price)}
                </Text>
                {hasPrime && (
                    <View style={tw`flex-row items-center`}>
                        <Image source={{ uri: "https://links.papareact.com/fdw" }} style={{ height: 20, width: 48, resizeMode: "cover" }} alt="Prime" />
                        <Text style={tw`text-xs text-gray-400 font-light ml-1`}>FREE Next-day Delivery</Text>
                    </View>
                )}
            </View>
        </View>
    )
}

export default Product
