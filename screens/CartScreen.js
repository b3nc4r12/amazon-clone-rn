import React, { useEffect, useState } from "react"
import { View, Text, Image, Pressable, ScrollView, Alert } from "react-native"
import { Divider, Icon } from "react-native-elements"
import CartHeader from "../components/cart/CartHeader"
import useAuth from "../hooks/useAuth"
import tw from "tailwind-react-native-classnames"
import { LinearGradient } from "expo-linear-gradient"
import { useRecoilValue } from "recoil"
import { cartState } from "../atoms/cartAtom"
import CartProduct from "../components/cart/CartProduct"
import { useStripe } from "@stripe/stripe-react-native"
import axios from "axios"
import { useNavigation } from "@react-navigation/core"
import { doc, serverTimestamp, setDoc } from "@firebase/firestore"
import { db } from "../firebase"
import Spinner from "react-native-loading-spinner-overlay"

const CartScreen = ({ setActiveScreen }) => {
    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [key, setKey] = useState(null);

    const { user } = useAuth();
    const cart = useRecoilValue(cartState);
    const [hasPrime, setHasPrime] = useState(cart?.map((item) => item.hasPrime).includes(false) ? false : true);

    useEffect(() => setHasPrime(cart.map((item) => item.hasPrime).includes(false) ? false : true), [cart])

    const fetchPaymentSheetParams = async () => {
        const response = await axios.post("https://stripe-payment-intent.vercel.app/create-payment-intent", {
            amount: (cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (hasPrime ? 0 : 9.99)) * 100
        })

        const clientSecret = await response.data.clientSecret

        setKey(clientSecret);

        return clientSecret
    }

    useEffect(() => {
        const initializePaymentSheet = async () => {
            const clientSecret = await fetchPaymentSheetParams();

            const { error } = await initPaymentSheet({ paymentIntentClientSecret: clientSecret });

            if (!error) setLoading(true);
        }

        return initializePaymentSheet()
    }, [])

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            completePayment();
        }
    }

    const completePayment = async () => {
        setPaymentLoading(true);

        await setDoc(doc(db, "users", user.email, "orders", key.split("_")[1]), {
            amount: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0),
            amount_shipping: hasPrime ? 0 : 9.99,
            images: cart.map((item) => item.image),
            timestamp: serverTimestamp()
        })
            .then(() => navigation.navigate("OrdersScreen"))
            .catch(() => Alert.alert("Error:", "An error occurred while completing your order."))
            .finally(() => setPaymentLoading(false))
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            <Spinner
                visible={paymentLoading}
                cancelable={false}
                overlayColor="rgba(0, 0, 0, 0.5)"
                textContent={"Completing your order..."}
                textStyle={tw`text-white`}
            />

            <CartHeader />
            <ScrollView style={tw`mb-20`}>
                <LinearGradient colors={["#b1e6ed", "#c9f1e2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={tw`h-11 flex-row items-center`}>
                    <Icon type="simple-line-icon" name="location-pin" size={20} style={tw`px-2.5`} />
                    <Text style={tw`font-medium`}>Deliver to {user ? `${user.name.split(" ")[0]} - ${user.location && user.location}` : "E1A"}?</Text>
                </LinearGradient>

                {!cart.length ? (
                    <>
                        <View style={tw`p-4 flex-row items-center border-b border-gray-300`}>
                            <Image source={{ uri: "https://i.ibb.co/Cv6n556/IMG-0558.jpg" }} style={tw`h-32 w-32`} />
                            <View style={tw`ml-3`}>
                                <Text style={tw`mb-4`}>Your Amazon Cart is empty</Text>
                                <Text style={{ color: "#4397a4" }}>Pick up where you left off</Text>
                            </View>
                        </View>
                        <Pressable onPress={() => setActiveScreen("Home")} style={[tw`shadow-md py-3 items-center rounded-md m-4`, { backgroundColor: "#fed814" }]}>
                            <Text style={tw`text-base`}>Continue shopping</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <View style={tw`mx-3 mt-4 mb-3`}>
                            <Text style={tw`text-xl`}>
                                <Text>Subtotal: </Text>
                                <Text style={tw`font-bold`}>
                                    {new Intl.NumberFormat("en-ca", {
                                        style: "currency",
                                        currency: "CAD",
                                    }).format(cart.reduce((acc, item) => acc + (item.price * item.quantity), 0))}
                                </Text>
                            </Text>
                            {!hasPrime && <Text style={tw`text-gray-600`}>Shipping: $9.99</Text>}
                            {hasPrime && (
                                <View style={tw`flex-row items-center mt-1`}>
                                    <Image
                                        source={{ uri: "https://i.ibb.co/s5L8S2b/green-checkmark.png" }}
                                        style={tw`h-5 w-5 mr-1`}
                                    />
                                    <Text style={tw`text-green-700`}>Your order qualifies for FREE shipping</Text>
                                </View>
                            )}
                            <Pressable
                                disabled={!loading}
                                onPress={openPaymentSheet}
                                style={[tw`shadow-md py-3 items-center rounded-md mt-2`, { backgroundColor: "#fed814" }]}
                            >
                                <Text style={tw`text-base`}>Proceed to checkout ({cart.length} {cart.length === 1 ? "item" : "items"})</Text>
                            </Pressable>
                        </View>
                        <Divider width={1} />
                        {cart.map((item, index) => (
                            <CartProduct key={index} index={index} {...item} />
                        ))}
                    </>
                )}
            </ScrollView>
        </View >
    )
}

export default CartScreen