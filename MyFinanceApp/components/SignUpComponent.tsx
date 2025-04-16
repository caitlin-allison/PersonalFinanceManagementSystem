import { useState } from "react";
import { View } from "react-native";
import PinCode from "./PinCode";
import { Button, Input, Text } from "@rneui/themed";
import { Link, useNavigation } from "@react-navigation/native";
export default function () {
    const navigation = useNavigation();

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
                onPress={() => navigation.navigate('Home')} />
            <Link screen="ForgotPin" style={{
                zIndex: 100,
                paddingTop: 25
            }}>Forgot Pin?</Link>

        </View>


    );
}