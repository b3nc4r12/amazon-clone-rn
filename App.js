import React from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./hooks/useAuth"
import StackNavigator from "./StackNavigator"
import { KeyboardAvoidingView, Platform } from "react-native"

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <StackNavigator />
            <StatusBar style="auto" />
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App