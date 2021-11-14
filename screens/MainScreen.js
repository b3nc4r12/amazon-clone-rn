import React, { useState } from "react"
import BottomTabs from "../components/BottomTabs"
import HomeScreen from "./HomeScreen"
import AccountScreen from "./AccountScreen"
import CartScreen from "./CartScreen"

const MainScreen = () => {
    const [activeScreen, setActiveScreen] = useState("Home");

    return (
        <>
            {
                activeScreen == "Home" ? <HomeScreen /> :
                    activeScreen == "Account" ? <AccountScreen setActiveScreen={setActiveScreen} /> :
                        activeScreen == "Cart" ? <CartScreen setActiveScreen={setActiveScreen} /> :
                            activeScreen == "Menu" && <HomeScreen />
            }
            <BottomTabs activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        </>
    )
}

export default MainScreen