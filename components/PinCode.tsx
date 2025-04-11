import { Button, Text, Icon } from "@rneui/themed"
import { useState } from "react"
import { View } from "react-native"

interface PinCodeProps {
    title?: string,
    pin: string,
    setPin: React.Dispatch<React.SetStateAction<string>>,
    size?: 'sm' | 'md' | 'lg',
    showCheck?: boolean,
    handleSubmit: () => void,
}

export default ({ title, size, showCheck, pin, setPin, handleSubmit }: PinCodeProps) => {

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

    const lastRow = (
        <View key={'finalRow'} style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            gap: 10,
            width: '100%',
            marginBottom: 25,
        }}>
            {showCheck && <Button
                key={'check'}
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
                        name="checkmark-outline"
                        type="ionicon"
                        color="orange" />}
                onPress={() => handleSubmit()}
            />
            }
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
                        color="orange" />}
                onPress={() => setPin([...pin].slice(0, -1).join(''))}
            />
        </View>
    )

    return (
        <View>
            <Text h3 style={{
                alignSelf: 'center',
                marginBottom: 15,
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