import React, { useEffect } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { NavigationContainer } from "@react-navigation/native"
import { AuthProvider } from "./hooks/useAuth"
import StackNavigator from "./StackNavigator"
import { KeyboardAvoidingView, Platform, LogBox } from "react-native"
import { RecoilRoot } from "recoil"

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"])

const App = () => {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}

export default App