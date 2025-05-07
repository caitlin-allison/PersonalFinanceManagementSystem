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
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/usehooks/queryKeys";
import { useUser } from "@/utils/UserContextProvider";

export function AddBillComponent() {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const db = useSQLiteContext();

    const userId = useUser().user?.userID as number;


    // Create a new bill using the custom hook
    const { mutate: createNewBill } = useCreateFinanceType(PersonalFinanceClasses.EXPENSE, db);

    // Form state
    const [category, setCategory] = useState<keyof BillCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [isMonthly, setIsMonthly] = useState<boolean>(false);

    // Handle form submission
    // - Create a new bill object and pass it to the createNewBill function
    // - Reset form fields after successful submission, and navigate to the home screen
    // - On error, show an alert with the error message
    const handleSubmit = () => {
        const newBill: CreateBill = {
            amount,
            category: category as BillCategory,
            payDate: date,
            description,
            isMonthly,
            userId,
            name,
        }

        // Asynchronously create a new bill
        // and invalidate the query cache
        // to refetch the data
        createNewBill({
            type: PersonalFinanceClasses.EXPENSE,
            formData: newBill
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
                alert("Error creating bill");
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
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
}
