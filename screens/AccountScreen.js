import React, { useEffect, useState } from "react"
import { View, Text, Pressable, Image, TouchableOpacity, FlatList, ScrollView } from "react-native"
import Header from "../components/account/Header"
import tw from "tailwind-react-native-classnames"
import { LinearGradient } from "expo-linear-gradient"
import FeaturesList from "../components/account/FeaturesList"
import { useNavigation } from "@react-navigation/core"
import useAuth from "../hooks/useAuth"
import validUrl from "valid-url"
import { collection, onSnapshot, orderBy, query } from "@firebase/firestore"
import { db } from "../firebase"
import { format } from "date-fns"
import currencyFormatter from "../lib/currencyFormatter"

const data = [
    "Your Orders",
    "Buy Again",
    "Your Account",
    "Your Wish List"
]

const AccountScreen = ({ setActiveScreen }) => {
    const navigation = useNavigation();
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
        <View style={tw`flex-1 bg-white`}>
            {/* Header and Gradient */}
            <LinearGradient colors={["#82d7e3", "#a4e6cf", "#fff"]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={tw`h-48 pt-10`}>
                <Header />
                {!user ? <Text style={tw`text-gray-800 text-2xl text-center font-normal mt-3 w-48 mx-auto`}>Sign in for the best experience</Text>
                    : (
                        <View style={tw`flex-row justify-between items-center pt-3 px-5`}>
                            <Text style={tw`text-xl text-gray-600`}>
                                <Text style={tw`font-medium`}>Hello, </Text>
                                <Text style={tw`font-extrabold text-gray-700`}>{user.name.split(" ")[0]}</Text>
                            </Text>

                            <TouchableOpacity onPress={() => navigation.navigate("EditProfileScreen")}>
                                <Image
                                    source={{ uri: validUrl.isUri(user.profilePicture) }}
                                    style={[tw`h-12 w-12 border-2 rounded-full`, { borderColor: "white" }]}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </LinearGradient>

            {!user ? (
                <>
                    {/* Auth Buttons */}
                    <Pressable
                        onPress={() => navigation.navigate("AuthScreen", { type: "login" })}
                        style={[tw`mt-2 mx-4 h-12 items-center justify-center border rounded-sm`, { backgroundColor: "#f3ce72", borderColor: "#af9146" }]}
                    >
                        <Text style={tw`text-gray-800`}>Sign In</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => navigation.navigate("AuthScreen", { type: "register" })}
                        style={[tw`mt-2 mx-4 h-12 items-center justify-center border rounded-sm`, { backgroundColor: "#eef0f3", borderColor: "#8d9096" }]}
                    >
                        <Text style={tw`text-gray-800`}>Create account</Text>
                    </Pressable>

                    {/* FeaturesList */}
                    <FeaturesList />
                </>
            ) : (
                <>
                    <View style={tw`flex-row justify-around flex-wrap px-2 -mt-8`}>
                        {data.map((text, index) => (
                            <TouchableOpacity
                                onPress={() => index === 2 ? navigation.navigate("AccountMenuScreen") : index === 0 ? navigation.navigate("OrdersScreen") : navigation.navigate("MainScreen")}
                                key={index}
                                style={[tw`items-center bg-gray-50 py-4 shadow-sm rounded-full border border-gray-300 mb-2.5`, { width: "45%" }]}
                            >
                                <Text>{text}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View>
                        <Text style={tw`text-lg text-gray-800 my-2 pl-5 font-bold`}>Your Orders</Text>
                        <ScrollView style={{ paddingHorizontal: 20, marginBottom: 400 }}>
                            {orders.map((order) => (
                                <View key={order.id} style={tw`my-5 shadow-lg`}>
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

                    <TouchableOpacity
                        onPress={() => setActiveScreen("Home")}
                        style={tw`items-center bg-gray-50 py-4 m-5 shadow-sm rounded-full border border-gray-300 mb-2.5`}
                    >
                        <Text>Return to the Homepage</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

export default AccountScreen