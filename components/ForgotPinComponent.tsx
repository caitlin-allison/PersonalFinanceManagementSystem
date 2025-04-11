import { Text } from "@rneui/themed"
import { View } from "react-native"
import PinCode from "./PinCode"
import { useState } from "react"
import { useRouter } from "expo-router"

export default () => {
    const router = useRouter()

    const [pin, setPin] = useState('')


    const handleSubmit = () => {
        router.replace('/home')
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