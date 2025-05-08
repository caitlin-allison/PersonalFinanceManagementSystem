import { Button, CheckBox, Input } from "@rneui/themed";
import DropdownComponent from "../DropdownComponent";
import { View } from "react-native";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import React, { useState } from "react";
import { MoneyInput } from "../MoneyInput";
import { useCreateFinanceType } from "@/usehooks/create/useCreateFinanceClass";
import { CreateIncome } from "@/usehooks/type";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import queryKeys from "@/usehooks/queryKeys";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/utils/UserContextProvider";
import { DatePickerComponent } from "./DatePickerComponent";


export function AddIncomeComponent() {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const db = useSQLiteContext();

    const userId = useUser().user?.userID as number;

    // Custom hook to create a new income
    const { mutate: createNewIncome, isError, isLoading } = useCreateFinanceType(PersonalFinanceClasses.INCOME, db);


    // State variables for form fields
    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [isMonthly, setIsMonthly] = useState<boolean>(false);

    // Handle form submission
    // - Create a new income object and pass it to the createNewIncome function
    // - Reset form fields after successful submission, and navigate to the home screen
    // - On error, show an alert with the error message
    const handleSubmit = () => {
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
                queryClient.invalidateQueries({ queryKey: queryKeys.all });

                // Reset form fields
                setAmount(0);
                setCategory(null);
                setDate(new Date());
                setDescription('');
                setIsMonthly(false);
                setName('');

                navigation.navigate('Main', { screen: 'Home' })
            },
            onError: (error) => {
                alert("Error creating goal");
            }
        });
    }
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
                <DatePickerComponent date={date} setDate={setDate} />
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
                    onPress={handleSubmit}
                />
            </View>
        </View>
    )
}