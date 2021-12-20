import React from "react"
import { View, Text, FlatList, Image } from "react-native"
import tw from "tailwind-react-native-classnames"
import { format } from "date-fns"
import currencyFormatter from "../../lib/currencyFormatter"

const Order = ({ order }) => {
    return (
        <View style={tw`my-5 shadow-lg`}>
            <View style={tw`bg-gray-300 rounded-t-2xl p-2`}>
                <Text style={tw`text-xs font-medium`}>{format(order.timestamp.toDate(), "MMMM dd, yyyy")}</Text>
                <Text style={tw`text-xs font-medium`}>ORDER ID: {order.id}</Text>
                <Text>Amount (without shipping): {currencyFormatter(order.amount)}</Text>
                <Text>Shipping: {currencyFormatter(order.amount_shipping)}</Text>
            </View>
            <View style={tw`p-2.5 bg-white rounded-b-2xl`}>
                <FlatList
                    data={order.images}
                    keyExtractor={(image, i) => i.toString()}
                    horizontal
                    ItemSeparatorComponent={() => <View style={tw`m-2`} />}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={[tw`h-32 w-32`, { resizeMode: "contain" }]}
                        />
                    )}
                />
            </View>
        </View>
    )
}

export default Order
