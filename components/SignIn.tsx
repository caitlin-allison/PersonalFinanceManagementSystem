import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { View, Text } from "react-native";
import { Button, Image } from "@rneui/themed";
import PinCode from "./PinCode";

export default () => {
    const [pin, setPin] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        router.replace('/home')
    }

    return (
        <View
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                containerStyle={{
                    width: 100,
                    height: 100,
                }}
                PlaceholderContent={<Text>Loading...</Text>}
            />
            <PinCode pin={pin} setPin={setPin} showCheck handleSubmit={handleSubmit} />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 25,
                    alignItems: 'center',
                }}
            >
                <Button title="Sign Up"
                    onPress={() => router.push('/(tabs)/signup')} />
                <Link href="/(tabs)/forgot_pin" asChild
                ><Text>Forgot Pin?</Text>
                </Link>
            </View>
        </View>

    )
}

