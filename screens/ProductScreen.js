import React, { useState } from "react"
import { View, Text, Image, ScrollView, Pressable } from "react-native"
import Header from "../components/HeaderWithBackButton"
import { LinearGradient } from "expo-linear-gradient"
import { Divider, Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"
import useAuth from "../hooks/useAuth"
import ProductHeader from "../components/product/ProductHeader"
import SelectDropdown from "react-native-select-dropdown"
import { useRecoilState } from "recoil"
import { cartState } from "../atoms/cartAtom"
import { useNavigation } from "@react-navigation/core"

const ProductScreen = ({ route }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const { id, title, price, category, image, rating, hasPrime } = route.params

    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useRecoilState(cartState);

    // Quantity Select Dropdown Options
    const options = []
    let counter = 1

    while (counter <= 30) {
        options.push(counter)
        counter++
    }
    // End Quantity Select Dropdown Options

    const addToCart = () => {
        const product = {
            id,
            title,
            price,
            quantity,
            image,
            hasPrime
        }

        const checkIfItemIsInCart = cart.findIndex((item) => item.id === product.id);

        if (checkIfItemIsInCart === -1) {
            setCart([...cart, product])
        } else {
            const newCart = cart.map((item) => {
                if (item.id === product.id) {
                    const newItem = {
                        ...item,
                        quantity: item.quantity + product.quantity
                    }

                    return newItem
                }
                return item
            })
            setCart(newCart)
        }

        navigation.navigate("MainScreen")
    }

    return (
        <View style={tw`bg-white flex-1`}>
            <Header />

            <ScrollView>
                <LinearGradient colors={["#b1e6ed", "#c9f1e2"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={tw`h-11 flex-row items-center`}>
                    <Icon type="simple-line-icon" name="location-pin" size={20} style={tw`px-2.5`} />
                    <Text style={tw`font-medium`}>Deliver to {user ? `${user.name.split(" ")[0]} - ${user.location && user.location}` : "E1A"}?</Text>
                </LinearGradient>

                <ProductHeader category={category} title={title} rating={rating} />

                <Image source={{ uri: image }} style={tw`h-80`} resizeMode="contain" />

                <Divider width={1} style={tw`my-2.5`} />

                <View style={tw`px-3`}>
                    <Text style={tw`font-semibold`}>
                        <Text style={tw`text-gray-600`}>Price: </Text>
                        <Text style={tw`text-red-700 text-lg`}>
                            {new Intl.NumberFormat("en-ca", {
                                style: "currency",
                                currency: "CAD",
                            }).format(price * quantity)}
                        </Text>
                    </Text>

                    <Text style={tw`text-lg text-green-700 my-2`}>In Stock.</Text>

                    <SelectDropdown
                        data={options}
                        onSelect={(qty) => setQuantity(qty)}
                        buttonTextAfterSelection={(qty) => `Qty: ${qty.toLocaleString()}`}
                        defaultValue={quantity}
                        dropdownStyle={tw`rounded-lg`}
                        buttonStyle={tw`rounded-lg w-24 border border-gray-400 h-9 mb-5`}
                        buttonTextStyle={tw`text-sm text-gray-700`}
                        renderDropdownIcon={() => <Icon type="entypo" name="chevron-down" size={20} style={tw`text-gray-700`} />}
                    />

                    <Pressable onPress={addToCart} style={[tw`shadow-md py-3 items-center rounded-md`, { backgroundColor: "#fed814" }]}>
                        <Text style={tw`text-base`}>Add to Cart</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductScreen