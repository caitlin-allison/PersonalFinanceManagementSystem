import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Input, Text } from "react-native-elements";
import PinCode from "./PinCode";
import { Button } from "@rneui/themed";

export default function () {
    const router = useRouter();

    const [pin, setPin] = useState('');


    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Text h2 style={{
                paddingTop: 25,
                zIndex: 100
            }}>Sign Up</Text>
            <Input placeholder="Email"
                containerStyle={{
                    zIndex: 100,
                }} />
            <Input placeholder="Phone #"
                containerStyle={{
                    zIndex: 100,

                }} />
            <PinCode pin={pin} setPin={setPin} size="md" handleSubmit={() => { }} />
            <Button title="Submit"
                containerStyle={{
                    zIndex: 100,
                }}
                onPress={() => router.replace('/home')} />


        </View>


    );
}