import { CheckBox, Input, Button } from "@rneui/themed";
import { View } from "react-native";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useState } from "react";
import { MoneyInput } from "../MoneyInput";
import { useCreateFinanceType } from "@/usehooks/create/useCreateFinanceClass";
import React from "react";
import { CreateGoal } from "@/usehooks/type";
import { useSQLiteContext } from "expo-sqlite";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import queryKeys from "@/usehooks/queryKeys";
import { useUser } from "@/utils/UserContextProvider";

export function AddGoalComponent() {
    const queryClient = useQueryClient();
    const navigation = useNavigation();
    const db = useSQLiteContext();

    const userId = useUser().user?.userID as number;

    // Custom hook to create a new goal
    const { mutate: createNewGoal, isError, isLoading } = useCreateFinanceType(PersonalFinanceClasses.GOAL, db);

    // State variables for form fields
    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [hasDeadline, setHasDeadline] = useState<boolean>(false);

    // Function to handle form submission
    // - Creates a new goal object with the form data
    // - Calls the createNewGoal function with the goal object
    // - On success, invalidates the query cache and resets the form fields, navigating to the home screen
    // - On error, shows an alert with the error message
    const handleSubmit = () => {
        const newGoal: CreateGoal = {
            amount,
            category: category as string,
            deadlineDate: hasDeadline ? date : null,
            description,
            hasDeadline,
            name,
            userId
        }

        createNewGoal({
            type: PersonalFinanceClasses.GOAL,
            formData: newGoal
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: queryKeys.all });

                // Reset form fields
                setAmount(0);
                setCategory(null);
                setDate(new Date());
                setDescription('');
                setHasDeadline(false);
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
                placeholder="Name of Goal"
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
                    alignSelf: 'flex-start',
                }}
            >
                <CheckBox
                    title="Has Deadline"
                    checked={hasDeadline}
                    onPress={() => setHasDeadline(!hasDeadline)}
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                />
                {hasDeadline && (
                    <Input
                        placeholder="Deadline Date"
                        value={date.toLocaleDateString()}
                        onChangeText={(text) => setDate(new Date(text))}
                    />
                )}
            </View>
            <Input
                placeholder="Description"
                style={{ width: '100%' }}
                value={description}
                onChangeText={setDescription}
            />

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