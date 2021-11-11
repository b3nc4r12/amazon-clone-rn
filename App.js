import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./hooks/useAuth"
import StackNavigator from "./StackNavigator"

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaProvider>
          <StackNavigator />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App