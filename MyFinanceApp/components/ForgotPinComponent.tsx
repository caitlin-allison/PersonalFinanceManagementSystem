import { Text } from "@rneui/themed"
import { View } from "react-native"
import PinCode from "./PinCode"
import { useState } from "react"
import { useNavigation } from "expo-router"

export function ForgotPinComponent() {
    const navigation = useNavigation();

    const [pin, setPin] = useState('')


    const handleSubmit = () => {
        navigation.navigate('Main', { screen: "Home" })
    }

    return (<View
        style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text h1>Forgot Pin</Text>
        <PinCode pin={pin} setPin={setPin} size="lg" handleSubmit={() => handleSubmit()} showCheck />
    </View>)
}