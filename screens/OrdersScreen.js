import React, { useLayoutEffect } from "react"
import { View, Text } from "react-native"
import { useResetRecoilState } from "recoil"
import { cartState } from "../atoms/cartAtom"

const OrdersScreen = () => {
    const emptyCart = useResetRecoilState(cartState);
    useLayoutEffect(() => emptyCart(), [])

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default OrdersScreen