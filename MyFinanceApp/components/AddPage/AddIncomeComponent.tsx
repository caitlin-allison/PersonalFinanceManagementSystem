import { Button, CheckBox, Input } from "@rneui/themed";
import DropdownComponent from "../DropdownComponent";
import { View } from "react-native";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useState } from "react";
import { MoneyInput } from "../MoneyInput";
import { useNavigation } from "expo-router";
import { useCreateFinanceType } from "@/usehooks/create/useCreateFinanceClass";
import React from "react";
import { CreateIncome } from "@/usehooks/type";


export function AddIncomeComponent() {
    const userId = 1; // TODO: get user id from context or props
    const navigation = useNavigation();

    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [isMonthly, setIsMonthly] = useState<boolean>(false);

    const { mutate: createNewIncome, isError, isLoading } = useCreateFinanceType(PersonalFinanceClasses.INCOME);

    const handleSubmit = React.useCallback(() => {
        const newIncome: CreateIncome = {
            amount,
            category: category as IncomeCategory,
            isMonthly,
            payDate: date,
            description,
            name,
            userId
        }

        createNewIncome({
            type: PersonalFinanceClasses.INCOME,
            formData: newIncome
        }, {
            onSuccess: () => {
                navigation.navigate('Main', { screen: 'Home' })
            },
            onError: (error) => {
                alert("Error creating goal");
            }
        });
    }, [amount, category, date, description, isMonthly, userId, name, createNewIncome, navigation]);

    return (
        <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'

        }}>
            <Input
                placeholder="Name of Income"
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
            <DropdownComponent value={category} setValue={setCategory} type={PersonalFinanceClasses.INCOME} />
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
    )
}