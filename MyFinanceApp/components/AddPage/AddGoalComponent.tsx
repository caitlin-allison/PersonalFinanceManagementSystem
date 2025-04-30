import { CheckBox, color, Input } from "@rneui/base";
import { Button, View } from "react-native";
import DropdownComponent from "../DropdownComponent";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useState } from "react";
import { MoneyInput } from "../MoneyInput";
import { useCreateFinanceType } from "@/usehooks/create/useCreateFinanceClass";
import React from "react";
import { CreateGoal } from "@/usehooks/type";
import { useNavigation } from "expo-router";

export function AddGoalComponent() {
    const userId = 1; // TODO: get user id from context or props
    const navigation = useNavigation();

    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [hasDeadline, setHasDeadline] = useState<boolean>(false);

    const { mutate: createNewGoal, isError, isLoading } = useCreateFinanceType(PersonalFinanceClasses.GOAL);

    const handleSubmit = React.useCallback(() => {
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
                navigation.navigate('Main', { screen: 'Home' })
            },
            onError: (error) => {
                alert("Error creating goal");
            }
        });
    }, [amount, category, date, description, hasDeadline, userId, name, createNewGoal, navigation]);


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
                    onPress={handleSubmit
                    }
                />
            </View>
        </View>
    )
}