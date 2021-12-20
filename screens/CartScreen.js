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
import currencyFormatter from "../lib/currencyFormatter"

const CartScreen = ({ setActiveScreen }) => {
    const { user } = useAuth();
    const cart = useRecoilValue(cartState);

    return (
        <View style={tw`flex-1 bg-white`}>
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
                ) : <Checkout user={user} cart={cart} />}
            </ScrollView>
        </View >
    )
}

const Checkout = ({ user, cart }) => {
    const navigation = useNavigation();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [hasPrime, setHasPrime] = useState(cart?.map((item) => item.hasPrime).includes(false) ? false : true);
    const [subtotal, setSubtotal] = useState(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    const [sheetLoading, setSheetLoading] = useState(false);

    useEffect(() => setHasPrime(cart.map((item) => item.hasPrime).includes(false) ? false : true), [cart])
    useEffect(() => setSubtotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0)), [cart])

    const fetchPaymentSheetParams = async () => {
        const response = await axios.post("https://stripe-payment-intent.vercel.app/create-payment-intent", {
            amount: (subtotal + (hasPrime ? 0 : 9.99)) * 100
        })

        const clientSecret = await response.data.clientSecret

        return clientSecret
    }

    const initializePaymentSheet = async () => {
        setSheetLoading(true);

        const clientSecret = await fetchPaymentSheetParams();

        await initPaymentSheet({
            paymentIntentClientSecret: clientSecret
        })
            .then(() => openPaymentSheet(clientSecret))
    }

    const openPaymentSheet = async (key) => {
        setSheetLoading(false);

        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            completePayment(key);
        }
    }

    const completePayment = async (key) => {
        setPaymentLoading(true);

        try {
            await setDoc(doc(db, "users", user.email, "orders", (key.split("_")[0] + "_" + key.split("_")[1])), {
                amount: subtotal,
                amount_shipping: hasPrime ? 0 : 9.99,
                images: cart.map((item) => item.image),
                timestamp: serverTimestamp()
            })

            navigation.navigate("OrdersScreen");
        } catch (error) {
            Alert.alert(error.message)
        } finally {
            setPaymentLoading(false);
        }
    }

    return (
        <>
            <Spinner
                visible={paymentLoading}
                cancelable={false}
                overlayColor="rgba(0, 0, 0, 0.5)"
                textContent={"Completing your order..."}
                textStyle={tw`text-white`}
            />
            <Spinner
                visible={sheetLoading}
                cancelable={false}
                overlayColor="rgba(0, 0, 0, 0.5)"
                textContent={"Initializing..."}
                textStyle={tw`text-white`}
            />
            <View style={tw`mx-3 mt-4 mb-3`}>
                <Text style={tw`text-xl`}>
                    <Text>Subtotal: </Text>
                    <Text style={tw`font-bold`}>
                        {currencyFormatter(subtotal)}
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
                <Divider width={1} style={tw`pt-1`} />
                <Text style={tw`text-xl`}>
                    <Text>Total: </Text>
                    <Text style={tw`font-bold`}>
                        {currencyFormatter(subtotal + (hasPrime ? 0 : 9.99))}
                    </Text>
                </Text>
                <Pressable
                    onPress={initializePaymentSheet}
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
    )
}

export default CartScreen