import React from "react"
import { View, Pressable } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"

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
            {icons.map((icon) => (
                <BottomIcon
                    key={icon.name}
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

const BottomIcon = ({ name, type, color, borderStatus, onPress }) => (
    <Pressable onPress={onPress} style={tw`relative pt-2.5 w-10`}>
        {borderStatus && (
            <View style={[tw`absolute top-0 left-0 right-0 border-t-4 rounded-b-md`, { borderColor: color }]} />
        )}
        <Icon type={type} name={name} size={30} color={color} />
    </Pressable>
)

export default BottomTabs