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
import Order from "../components/order/Order"

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
            <ScrollView style={tw`px-5`}>
                <Text style={tw`pt-5 text-lg font-medium`}>Your Orders</Text>
                {orders.map((order) => (
                    <Order key={order.id} order={order} />
                ))}
            </ScrollView>
        </View>
    )
}

export default OrdersScreen