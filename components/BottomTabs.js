import React from "react"
import { View, Pressable, Text } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"
import { useRecoilValue } from "recoil"
import { cartState } from "../atoms/cartAtom"

const icons = [
    {
        name: "Home",
        iconType: "material-community",
        iconName: "home-outline"
    },
    {
        name: "Account",
        iconType: "material-community",
        iconName: "account-outline"
    },
    {
        name: "Cart",
        iconType: "material-community",
        iconName: "cart-outline"
    },
    {
        name: "Menu",
        iconType: "material-community",
        iconName: "menu"
    }
]

const BottomTabs = ({ activeScreen, setActiveScreen }) => {
    return (
        <View style={tw`absolute bottom-0 left-0 right-0 bg-white h-20 border-t border-gray-300 shadow-md flex-row justify-around`}>
            {icons.map((icon, index) => (
                <BottomIcon
                    key={index}
                    index={index}
                    name={icon.iconName}
                    type={icon.iconType}
                    color={activeScreen === icon.name ? "#4397a4" : "#000"}
                    onPress={() => setActiveScreen(icon.name)}
                    borderStatus={activeScreen === icon.name ? true : false}
                />
            ))}
        </View>
    )
}

const BottomIcon = ({ name, type, color, borderStatus, onPress, index }) => {
    const cart = useRecoilValue(cartState);

    return (
        <Pressable onPress={onPress} style={tw`relative pt-2.5 w-10`}>
            {borderStatus && (
                <View style={[tw`absolute top-0 left-0 right-0 border-t-4 rounded-b-md`, { borderColor: color }]} />
            )}
            <View style={tw`relative`}>
                {index === 2 && (
                    <View style={tw`absolute -top-1 right-0 h-4 w-4 bg-yellow-500 rounded-full justify-center items-center z-50`}>
                        <Text style={tw`font-extrabold text-xs`}>{cart.length ? cart.length : "0"}</Text>
                    </View>
                )}
                <Icon type={type} name={name} size={30} color={color} />
            </View>
        </Pressable>
    )
}

export default BottomTabs