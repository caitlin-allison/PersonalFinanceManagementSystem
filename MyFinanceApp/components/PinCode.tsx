import { Button, Text, Icon, useTheme } from "@rneui/themed"
import { View } from "react-native"

interface PinCodeProps {
    title?: string,
    pin: string,
    setPin: React.Dispatch<React.SetStateAction<string>>,
    size?: 'sm' | 'md' | 'lg',
    showCheck?: boolean,
    handleSubmit: () => void,
}

/**
 * @param title - The title of the pin code component
 * @param pin - The pin code value
 * @param setPin - Function to set the pin code value
 * @param size - The size of the buttons
 * @param showCheck - Whether to show the check button
 * @param handleSubmit - Function to handle the submission of the pin code
 * @returns A pin code component that allows the user to enter a pin code and submit it
 * @description This component is used to enter a pin code. It displays a grid of buttons with numbers 0-9 and a check button. The user can enter the pin code by pressing the buttons. The pin code is stored in the state and can be submitted by pressing the check button. The component also displays the entered pin code as asterisks.
 */
export default ({ title, size, showCheck, pin, setPin, handleSubmit }: PinCodeProps) => {

    const theme = useTheme().theme;

    // Create a grid of buttons with numbers 1-9
    // - Groups the buttons into rows of 3
    // - Presets CSS styles for the buttons
    // - Sets the pin code value in the state when a button is pressed
    const numberButtons = [[1, 2, 3], [4, 5, 6], [7, 8, 9]].map((row, i) => {
        return (
            <View key={i} style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                width: '100%'

            }}>
                {row.map((number) => {
                    return (
                        <Button
                            key={number}
                            type="outline"
                            radius={100}
                            size={size ?? 'lg'}
                            containerStyle={{
                                margin: 0,
                                width: 50,
                            }}
                            title={number.toString()}
                            onPress={() => setPin(pin + number)}
                        />
                    )
                })}
            </View>
        )

    })

    // Create a row with the 0 button, the check, and delete button
    // - Presets CSS styles for the buttons
    // - Sets the pin code value in the state when a button is pressed
    // - Calls the handleSubmit function when the check button is pressed
    // - Deletes the last character of the pin code when the delete button is pressed
    // - Shows the check button only if showCheck is true
    const lastRow = (
        <View key={'finalRow'} style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            width: '100%',
            marginBottom: 25,
        }}>
            <Button
                key={'check'}
                type="outline"
                radius={100}
                disabled={!showCheck}
                size={size ?? "lg"}
                containerStyle={{
                    opacity: showCheck ? 1 : 0,
                    margin: 0,
                    width: 50,
                }}
                iconContainerStyle={{
                    margin: 0,
                }}
                icon={
                    <Icon
                        name="checkmark-outline"
                        type="ionicon"
                        color={theme.colors.primary} />}
                onPress={() => handleSubmit()}
            />
            <Button
                key={0}
                type="outline"
                radius={100}
                size={size ?? "lg"}
                containerStyle={{
                    margin: 0,
                    width: 50,
                }}
                title={'0'}
                onPress={() => setPin(pin + 0)}
            />
            <Button
                key={'delete'}
                type="outline"
                radius={100}
                size={size ?? "lg"}
                containerStyle={{
                    margin: 0,
                    width: 50,
                }}
                iconContainerStyle={{
                    margin: 0,
                }}
                icon={
                    <Icon
                        name="chevron-back-outline"
                        type="ionicon"
                        color={theme.colors.primary} />}
                onPress={() => setPin([...pin].slice(0, -1).join(''))}
            />
        </View>
    )

    return (
        <View
            style={{
                marginTop: 25,
            }}
        >
            <Text h3 style={{
                alignSelf: 'center',
            }}>
                {title ?? 'Enter Pin'}
            </Text>
            <Text
                h4
                style={{
                    alignSelf: 'center',
                    marginBottom: 15,
                }}>
                {[...pin].map(() => '*')}
            </Text>
            <View
                style={{
                    gap: 10,
                }}>
                {numberButtons}
                {lastRow}
            </View>
        </View>
    )

}