import React from "react"
import { TouchableOpacity } from "react-native"
import { View, Image } from "react-native"
import { Icon } from "react-native-elements"
import tw from "tailwind-react-native-classnames"
import useAuth from "../../hooks/useAuth"

const Header = () => {
    const { user } = useAuth();

    return (
        <View style={tw`px-3 pt-2 flex-row justify-between items-center`}>
            <Image
                source={{ uri: "https://cdn.freebiesupply.com/images/large/2x/amazon-logo-black-transparent.png" }}
                style={{ height: 40, width: 90, resizeMode: "contain" }}
            />
            <View style={tw`flex-row items-center`}>
                {user &&
                    <TouchableOpacity>
                        <Icon type="fontisto" name="bell" size={20} color="black" style={tw`mr-5`} />
                    </TouchableOpacity>
                }
                <TouchableOpacity>
                    <Icon type="fontisto" name="search" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header