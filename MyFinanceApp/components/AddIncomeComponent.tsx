import { CheckBox, Input } from "@rneui/themed";
import DropdownComponent from "./DropdownComponent";
import { View } from "react-native";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useState } from "react";
import { MoneyInput } from "./MoneyInput";

export function AddIncomeComponent() {
    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [isMonthly, setIsMonthly] = useState<boolean>(false);

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

        </View>
    )
}