import React, { useState } from 'react';
// import ForgotPinComponent from '@/components/ForgotPinComponent';
import { useNavigation } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import PinCode from '@/components/PinCode';

export default function ForgotPinScreen() {
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
