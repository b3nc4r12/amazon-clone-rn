import React from "react"
import { View, Text } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"

const ProductHeader = ({ category, title, rating }) => {
    return (
        <View style={tw`p-3`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={{ color: "#4397a4" }}>{category}</Text>
                <View style={tw`flex-row items-center`}>
                    {Array(parseInt(rating.rate)).fill().map((_, i) => (
                        <Icon key={i} type="antdesign" name="star" size={14} color="rgba(245, 158, 11, 1)" />
                    ))}
                    <Text style={tw`ml-1 text-xs`}>{rating.count}</Text>
                </View>
            </View>
            <Text style={tw`text-gray-600 mt-1`}>{title}</Text>
        </View>
    )
}

export default ProductHeader