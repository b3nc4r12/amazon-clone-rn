import React from "react"
import { View, Text, Image, ScrollView, Pressable } from "react-native"
import tw from "tailwind-react-native-classnames"
import { useNavigation } from "@react-navigation/core"
import useAuth from "../../hooks/useAuth"

const data = [
    {
        id: "123",
        title: "Beauty Picks",
        image: "https://post.healthline.com/wp-content/uploads/2020/04/makeup_composition_overhead-732x549-thumbnail.jpg"
    },
    {
        id: "456",
        title: "Subscribe & Save",
        image: "https://m.media-amazon.com/images/I/81PPch5ebCL._AC_SL1500_.jpg"
    },
    {
        id: "789",
        title: "Home Entertainment",
        image: "https://www.indiewire.com/wp-content/uploads/2020/12/AdobeStock_214570941.jpeg"
    },
    {
        id: "101112",
        title: "Shop Pantry Month",
        image: "https://sanctuaryhomedecor.com/wp-content/uploads/2019/04/www.bhg_.comdecoratingmakeoversfamily-cottage-kitchen-storagedid296087-20181026utm_campaignbhg-decorating_newsletterutm_sourcebhg.comutm_mediumemailutm_content102618cid296087mid15815276892-715x1024.png"
    }
]

const HomeList = () => {
    const navigation = useNavigation();

    const { user } = useAuth();

    return (
        <ScrollView horizontal contentContainerStyle={tw`items-center pb-2`} style={{ marginTop: -70, zIndex: 50, flexDirection: "row" }}>
            <View style={tw`${user && "hidden"} bg-white mx-2.5 rounded-md p-2.5 justify-between h-44 shadow-md`}>
                <View>
                    <Text style={tw`font-bold text-lg`}>Welcome</Text>
                    <Text style={[tw`font-light`, { fontSize: 15, width: 210 }]}>Sign in for your best experience</Text>
                </View>
                <View>
                    <Pressable
                        onPress={() => navigation.navigate("AuthScreen", { type: "login" })}
                        style={[{ backgroundColor: "#ffd812" }, tw`shadow-md w-full py-2.5 rounded-md items-center`]}
                    >
                        <Text>Sign in</Text>
                    </Pressable>
                    <Text onPress={() => navigation.navigate("AuthScreen", { type: "register" })} style={{ color: "#4397a4", fontSize: 15, marginTop: 5 }}>Create an account</Text>
                </View>
            </View>
            {data?.map((item, index) => (
                <View key={item.id} style={tw`bg-white h-44 w-32 ${index == 0 && user && "ml-2.5"} mr-2.5 rounded-md justify-between shadow-md`}>
                    <Text style={tw`font-medium p-2`}>{item.title}</Text>
                    <Image source={{ uri: item.image }} style={{ width: "100%", height: 128, resizeMode: "cover", borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }} />
                </View>
            ))}
        </ScrollView>
    )
}

export default HomeList