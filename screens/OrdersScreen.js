import React, { useLayoutEffect, useEffect, useState } from "react"
import { View, Text, Image } from "react-native"
import { useResetRecoilState } from "recoil"
import { cartState } from "../atoms/cartAtom"
import { collection, query, orderBy, onSnapshot } from "@firebase/firestore"
import { db } from "../firebase"
import useAuth from "../hooks/useAuth"
import Header from "../components/HeaderWithBackButton"
import tw from "tailwind-react-native-classnames"
import { ScrollView } from "react-native"
import currencyFormatter from "../lib/currencyFormatter"
import { FlatList } from "react-native"
import { format } from "date-fns"

const OrdersScreen = () => {
    const emptyCart = useResetRecoilState(cartState);
    useLayoutEffect(() => emptyCart(), []);
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "users", user.email, "orders"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setOrders(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
                }
            ),
        [db]
    )

    return (
        <View style={tw`bg-white flex-1`}>
            <Header />
            <ScrollView>
                <Text style={tw`pt-5 pl-5 text-lg font-medium`}>Your Orders</Text>
                {orders.map((order) => (
                    <View key={order.id} style={tw`m-5 shadow-lg`}>
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
                ))}
            </ScrollView>
        </View>
    )
}

export default OrdersScreen