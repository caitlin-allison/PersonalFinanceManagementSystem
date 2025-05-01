import { useState } from "react";
import { View } from "react-native";
import PinCode from "./PinCode";
import { Button, Input, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useCreateUser } from "@/usehooks/create/useCreateUser";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/usehooks/queryKeys";
export default function () {
    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const [pin, setPin] = useState('');
    const [email, setEmail] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [phone, setPhone] = useState<string | null>(null);

    const { mutate: addUser } = useCreateUser()

    // Error handling, 
    // displays error messages if the user does 
    // not fill out the form correctly
    const [errors, setErrors] = useState<
        {
            email?: string,
            name?: string,
            phone?: string,
            pin?: string
        } | null>(null);

    // Handle form submission
    // - Validates the input fields, and sets error messages if any field is invalid
    // - If all fields are valid, calls the addUser function to create a new user
    // - On success, invalidates the query cache and navigates to the home screen
    // - On error, shows an alert with the error message
    const handleSubmit = () => {
        let newErrors = errors ? { ...errors } : {};
        if (!pin) {
            newErrors = { ...errors, pin: "Pin is required" }
        }
        else if (pin.length !== 4) {
            newErrors = { ...errors, pin: "Pin must be 4 digits" }
        }
        else {
            delete newErrors.pin
        }

        if (!email || !email.includes('@')) {
            newErrors = { ...errors, email: "Email must be valid" }
        }
        else {
            delete newErrors.email
        }
        if (!name) {
            newErrors = { ...errors, name: "Name is required" }
        }
        else {
            delete newErrors.name
        }
        if (!phone) {
            newErrors = { ...errors, phone: "Phone is required" }
        }
        else {
            delete newErrors.phone
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        else {
            setErrors(null);
            addUser({
                email: email ?? '',
                name: name ?? '',
                phone: phone ?? 'undefined',
                pin: pin
            },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: queryKeys.users })
                        queryClient.invalidateQueries({ queryKey: queryKeys.all })
                        console.log("User created successfully")
                        navigation.navigate('Main', { screen: 'Home' })
                    },
                    onError: (error) => {
                        alert("Error creating user")
                    }
                })
        }
    }


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
            <View style={{
                width: '75%',
                marginTop: 50,
            }}>
                <Input placeholder="Name"
                    containerStyle={{
                        zIndex: 100,
                    }}
                    value={name ?? undefined}
                    onChangeText={setName}
                    errorMessage={errors?.name}
                />
                <Input placeholder="Email"
                    containerStyle={{
                        zIndex: 100,
                    }}
                    value={email ?? undefined}
                    onChangeText={setEmail}
                    errorMessage={errors?.email}
                />
                <Input placeholder="Phone #"
                    containerStyle={{
                        zIndex: 100,
                    }}
                    value={phone ?? undefined}
                    onChangeText={setPhone}
                    errorMessage={errors?.phone}
                />
            </View>
            <PinCode
                pin={pin}
                setPin={setPin}
                size="md"
                handleSubmit={() => { }} />
            {errors?.pin && <Text style={{ color: 'red', marginBottom: 25 }}>{errors.pin}</Text>}
            <Button title="Submit"
                containerStyle={{
                    zIndex: 100,
                }}
                onPress={handleSubmit} />

        </View>


    );
}