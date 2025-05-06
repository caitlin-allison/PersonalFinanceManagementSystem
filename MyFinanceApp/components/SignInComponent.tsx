import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { Button, Input, Text, useTheme } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import PinCode from "./PinCode";
import { useUsers } from "@/usehooks/get/useUsers";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/utils/UserContextProvider";

export function SignInComponent() {
    const { data: users } = useUsers()
    const { setUser } = useUser()
    const theme = useTheme();

    const [pin, setPin] = useState('');
    const [email, setEmail] = useState<string | null>(users[0]?.email ?? null);

    const navigation = useNavigation();

    // Handle form submission
    // - Validates the pin and email fields
    // - Checks if the pin is correct and if the user exists
    // - If validation passes, navigates to the home screen
    // - If validation fails, shows an alert with the error message
    // - If the user is not found, shows an alert with the error message
    const handleSubmit = () => {
        // Find the user with the given email
        const user = users?.find(user => user.email === email)
        if (!pin) {
            alert("Please enter your pin")
            return;
        }
        if (pin.length !== 4) {
            alert("Pin must be 4 digits")
            return;
        }
        if (users?.length === 0) {
            alert("No users found")
            return;
        }
        if (user?.pin !== pin) {
            alert(`Pin is incorrect, try again`)
            return;
        }
        else {
            setUser(user)
            navigation.navigate('Main', { screen: 'Home' })
        }
    }

    // useEffect, runs when the data is loaded
    // - Users may not be loaded yet, so we need to wait for them to be loaded
    // - If the users array is empty, we return
    // - If the users array is not empty, we set the email state to the first user's email
    useEffect(() => {
        if (users?.length === 0) return
        setEmail(users[0].email ?? null)
    }, [users,
        setEmail,
        navigation])

    return (
        <>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <SafeAreaProvider style={{ flex: 1, marginTop: 50 }}>
                    <SafeAreaView >
                        <Image
                            style={{
                                width: 200,
                                height: 200,
                                marginBottom: 20,
                            }}
                            source={require('@/public/logo.png')}
                        />
                    </SafeAreaView>
                </SafeAreaProvider>
                <Input placeholder="Email"
                    containerStyle={{
                        zIndex: 100,
                        width: '50%',
                        marginTop: 200,
                        paddingBottom: 0,
                    }}
                    value={email ?? undefined}
                    onChangeText={setEmail}
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
                        onPress={() => navigation.navigate('SignUp')} />
                </View>
            </View>
        </>

    )
}

