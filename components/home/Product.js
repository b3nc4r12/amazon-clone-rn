import React, { useState } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"
import { useNavigation } from "@react-navigation/core"
import truncate from "../../lib/truncate"
import currencyFormatter from "../../lib/currencyFormatter"

const Product = ({ id, title, price, category, image, rating }) => {
    const navigation = useNavigation();
    const [hasPrime] = useState(Math.random() < 0.5);

    return (
        <Pressable
            onPress={() => navigation.navigate("ProductScreen", { id, title, price, category, image, rating, hasPrime })}
            style={[tw`flex-row items-center w-full bg-white px-2.5 mb-1.5 shadow-md`, { height: 175 }]}
        >
            <View>
                <Image source={{ uri: image }} style={{ height: 100, width: 100, resizeMode: "contain" }} />
            </View>
            <View style={[tw` ml-5 py-5`, { width: "65%" }]}>
                <Text style={tw`text-xs text-gray-500`}>{category}</Text>
                <Text style={{ fontSize: 15, marginTop: 3 }}>{truncate(title, 75)}</Text>
                <View style={tw`flex-row items-center mt-1`}>
                    {Array(parseInt(rating.rate)).fill().map((_, i) => (
                        <Icon key={i} type="antdesign" name="star" size={16} color="rgba(245, 158, 11, 1)" />
                    ))}
                    <Text style={tw`ml-1 text-gray-700 font-light text-xs`}>{rating.count}</Text>
                </View>
                <Text style={tw`text-lg`}>
                    {currencyFormatter(price)}
                </Text>
                {hasPrime && (
                    <View style={tw`flex-row items-center`}>
                        <Image source={{ uri: "https://links.papareact.com/fdw" }} style={{ height: 20, width: 48, resizeMode: "cover" }} alt="Prime" />
                        <Text style={tw`text-xs text-gray-400 font-light ml-1`}>FREE Next-day Delivery</Text>
                    </View>
                )}
            </View>
        </Pressable>
    )
}

export default Product
