import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button, Image } from "@rneui/themed";
import { Link, useNavigation } from "@react-navigation/native";
import PinCode from "./PinCode";
import { useSQLiteContext } from "expo-sqlite";

export default () => {
    const db = useSQLiteContext();
    const [version, setVersion] = useState('');
    useEffect(() => {
        async function setup() {
            const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
                'SELECT sqlite_version()'
            );
            setVersion(result ? result['sqlite_version()'] : '-1');
        }
        setup();
    }, []);

    const [pin, setPin] = useState('');

    const navigation = useNavigation();


    return (
        <>
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
                    source={require('../assets/logo.png')}
                    PlaceholderContent={<Text>Loading...</Text>}
                />
                {/* <Text>SQLite version: {version}</Text> */}
                <PinCode pin={pin} setPin={setPin} showCheck handleSubmit={() => navigation.navigate('Main', { screen: 'Home' })} />
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
                    <Link screen="ForgotPin"
                    ><Text>Forgot Pin?</Text>
                    </Link>
                </View>
            </View>
        </>

    )
}

