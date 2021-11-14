import React, { useEffect, useState } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { Icon } from "react-native-elements"
import { useRecoilState } from "recoil"
import tw from "tailwind-react-native-classnames"
import { cartState } from "../../atoms/cartAtom"
import truncate from "../../utils/truncate"

const CartProduct = ({ id, index, title, price, image, hasPrime }) => {
    const [cart, setCart] = useRecoilState(cartState);
    const [productQuantity, setProductQuantity] = useState(cart[index]?.quantity);

    if (!cart) return null

    const lowerQuantity = (id) => {
        setProductQuantity(productQuantity - 1);

        const newCart = cart.map((item) => {
            if (item.id === id) {
                const newItem = {
                    ...item,
                    quantity: item.quantity - 1
                }

                return newItem
            }

            return item
        })

        setCart(newCart);
    }

    const augmentQuantity = (id) => {
        setProductQuantity(productQuantity + 1);

        const newCart = cart.map((item) => {
            if (item.id === id) {
                const newItem = {
                    ...item,
                    quantity: item.quantity + 1
                }

                return newItem
            }

            return item
        })

        setCart(newCart);
    }

    const removeFromCart = (id) => {
        const index = cart.findIndex((item) => item.id === id);

        let newCart = [...cart]

        if (index >= 0) {
            newCart.splice(index, 1);
        } else {
            console.warn("Can't remove product as it's not in the cart!");
        }

        setCart(newCart);
    }

    return (
        <View style={tw`w-full bg-white shadow-md px-2.5 mb-1.5`}>
            <View style={[tw`flex-row items-center`, { height: 175 }]}>
                <View>
                    <Image source={{ uri: image }} style={{ height: 100, width: 100, resizeMode: "contain" }} />
                </View>
                <View style={[tw`ml-5 py-5`, { width: "65%" }]}>
                    <Text style={{ fontSize: 15, marginTop: 3 }}>{truncate(title, 60)}</Text>
                    <Text style={tw`text-lg font-bold`}>
                        {new Intl.NumberFormat("en-ca", {
                            style: "currency",
                            currency: "CAD",
                        }).format(price * productQuantity)}
                    </Text>
                    <Text style={tw`text-xs text-green-700`}>In Stock</Text>
                </View>
            </View>
            <View style={tw`flex-row items-center`}>
                <View style={tw`h-9 rounded-md flex-row items-center m-2`}>
                    <View style={tw`bg-gray-200 w-9 h-9 rounded-l-md border border-gray-500`}>
                        {productQuantity > 1 ? (
                            <Pressable onPress={() => lowerQuantity(id)} style={tw`h-full w-full justify-center items-center`}>
                                <Icon type="antdesign" name="minus" size={20} color="black" />
                            </Pressable>
                        ) : (
                            <Pressable onPress={() => removeFromCart(id)} style={tw`h-full w-full justify-center items-center`}>
                                <Icon type="ionicon" name="trash-outline" size={20} color="black" />
                            </Pressable>
                        )}
                    </View>
                    <View style={tw`bg-white justify-center items-center w-12 h-9 border-t border-b border-gray-500 `}>
                        <Text style={[tw`text-base`, { color: "#4397a4" }]}>{productQuantity}</Text>
                    </View>
                    <Pressable
                        onPress={() => augmentQuantity(id)}
                        style={tw`bg-gray-200 w-9 h-9 rounded-r-md border border-gray-500 justify-center items-center`}
                    >
                        <Icon type="antdesign" name="plus" size={20} color="black" />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default CartProduct