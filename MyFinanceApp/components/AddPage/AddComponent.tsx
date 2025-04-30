import { getPersonalFinanceClassIcon } from "@/utils/getPersonalFinanceClassIcon";
import { PersonalFinanceClasses } from "@/utils/types";
import { Button, ButtonGroup, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { AddBillComponent } from "../AddBillComponent";
import { AddIncomeComponent } from "../AddIncomeComponent";
import { AddGoalComponent } from "../AddGoalComponent";
import { useNavigation } from "@react-navigation/native";

export function AddComponent() {
    const navigation = useNavigation();

    const [selectedIndex, setSelectedIndex] = useState(null);


    const handleSubmit = () => {
        navigation.navigate('Main', { screen: 'Home' })
    }

    return (
        <View
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                height: 'auto',
                justifyContent: 'space-between', alignItems: 'center'
            }}>
                <ButtonGroup
                    buttonStyle={{ width: '100%' }}
                    containerStyle={{ width: '100%' }}
                    buttons={[<Text style={{ display: 'flex', justifyContent: 'center' }}>
                        {getPersonalFinanceClassIcon(PersonalFinanceClasses.INCOME)} Income
                    </Text>, <Text style={{ display: 'flex', justifyContent: 'center' }}>
                        {getPersonalFinanceClassIcon(PersonalFinanceClasses.EXPENSE)} Bill
                    </Text>, <Text style={{ display: 'flex', justifyContent: 'center' }}>
                        {getPersonalFinanceClassIcon(PersonalFinanceClasses.GOAL)} Goal
                    </Text>]}
                    selectedIndex={selectedIndex}
                    onPress={(index) => setSelectedIndex(index)}
                />
            </View>

            {selectedIndex !== null ? (
                selectedIndex === 0 ? <AddIncomeComponent /> : selectedIndex === 1 ? <AddBillComponent /> : <AddGoalComponent />

            ) : <Text>Select a tab</Text>}
            {selectedIndex !== null && (
                <View style={{
                    display: 'flex',
                    flexDirection: 'row', justifyContent: 'space-evenly',
                    marginTop: 20, gap: 10, width: '100%',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                }}>

                    <Button
                        title="Cancel"
                        onPress={() => setSelectedIndex(null)}
                    />
                    <Button
                        title="Save"
                        onPress={() => {
                            setSelectedIndex(null)
                            handleSubmit()
                        }}
                    />
                </View>)}
        </View >

    );
}


type ExpenseForm = {

    amount: number;
    date: Date;
    description: string;
    category: string;
    paymentMethod: string;
    notes: string;
    isMonthly: boolean;
}