import { BillCategory, PersonalFinanceClasses } from "@/utils/types";
import { CheckBox } from "@rneui/base";
import { Input } from "@rneui/themed";
import { useState } from "react";
import { View } from "react-native";
import DropdownComponent from "./DropdownComponent";
import { MoneyInput } from "./MoneyInput";

export function AddBillComponent() {
    const [category, setCategory] = useState<keyof BillCategory | null>(null);
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
        </View>
    );
}
