import { getPersonalFinanceClassIcon } from "@/utils/getPersonalFinanceClassIcon";
import { PersonalFinanceClasses } from "@/utils/types";
import { ButtonGroup, Text } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { AddBillComponent } from "./AddBillComponent";
import { AddIncomeComponent } from "./AddIncomeComponent";
import { AddGoalComponent } from "./AddGoalComponent";

export function AddComponent() {
    const [selectedIndex, setSelectedIndex] = useState(0);

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

            {selectedIndex !== null && (
                selectedIndex === 0 ? <AddIncomeComponent /> :
                    selectedIndex === 1 ? <AddBillComponent /> : <AddGoalComponent />

            )}
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