import React, { useState } from "react"
import BottomTabs from "../components/BottomTabs"
import HomeScreen from "./HomeScreen"
import AccountScreen from "./AccountScreen"

const MainScreen = () => {
    const [activeScreen, setActiveScreen] = useState("Home");

    return (
        <>
            {
                activeScreen == "Home" ? <HomeScreen /> :
                    activeScreen == "Account" ? <AccountScreen /> :
                        activeScreen == "Cart" ? <HomeScreen /> :
                            activeScreen == "Menu" && <HomeScreen />
            }
            <BottomTabs activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        </>
    )
}

export default MainScreen