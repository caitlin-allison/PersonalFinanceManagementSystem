import { BillCategory, PersonalFinanceClasses } from "@/utils/types";
import { CheckBox } from "@rneui/base";
import { Button, Input } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import DropdownComponent from "../DropdownComponent";
import { MoneyInput } from "../MoneyInput";
import { useCreateFinanceType } from "@/usehooks/create/useCreateFinanceClass";
import React from "react";
import { CreateBill } from "@/usehooks/type";
import { useNavigation } from "expo-router";

export function AddBillComponent() {
    const userId = 1; // TODO: get user id from context or props
    const navigation = useNavigation();

    const [category, setCategory] = useState<keyof BillCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [isMonthly, setIsMonthly] = useState<boolean>(false);

    const { mutate: createNewBill } = useCreateFinanceType(PersonalFinanceClasses.EXPENSE);

    const handleSubmit = React.useCallback(() => {
        const newBill: CreateBill = {
            amount,
            category: category as BillCategory,
            payDate: date,
            description,
            isMonthly,
            userId,
            name,
        }

        createNewBill({
            type: PersonalFinanceClasses.EXPENSE,
            formData: newBill
        }, {
            onSuccess: () => {
                navigation.navigate('Main', { screen: 'Home' })
            },
            onError: (error) => {
                alert("Error creating bill");
            }
        });

    }, [amount, category, date, description, isMonthly, userId, name, createNewBill, navigation]);

    return (
        <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'

        }}>
            <Input
                placeholder="Name of Bill"
                style={{ width: '100%' }}
                value={name}
                onChangeText={setName}
            />
            <MoneyInput
                value={amount}
                setValue={setAmount}
            />
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    maxWidth: '100%',
                    alignItems: 'flex-start',
                }}
            >
                <CheckBox
                    title="Is Monthly"
                    checked={isMonthly}
                    onPress={() => setIsMonthly(!isMonthly)}
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                />
                <Input
                    placeholder="Date"
                    value={date.toLocaleDateString()}
                    onChangeText={(text) => setDate(new Date(text))}
                />
            </View>
            <Input
                placeholder="Description"
                style={{ width: '100%' }}
                value={description}
                onChangeText={setDescription}
            />
            <DropdownComponent value={category} setValue={setCategory} type={PersonalFinanceClasses.EXPENSE} />
            <View style={{
                display: 'flex',
                flexDirection: 'row', justifyContent: 'space-evenly',
                marginTop: 20, gap: 10, width: '100%',
                alignItems: 'center',
                alignSelf: 'flex-end',
            }}>

                <Button
                    title="Cancel"
                    onPress={() => navigation.navigate('Main', { screen: 'Home' })}
                />
                <Button
                    title="Save"
                    onPress={handleSubmit
                    }
                />
            </View>
        </View>
    );
}
