import { CheckBox, color, Input } from "@rneui/base";
import { View } from "react-native";
import DropdownComponent from "./DropdownComponent";
import { IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useState } from "react";
import { MoneyInput } from "./MoneyInput";

export function AddGoalComponent() {
    const [category, setCategory] = useState<keyof IncomeCategory | null>(null);
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [hasDeadline, setHasDeadline] = useState<boolean>(false);

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
        </View>
    )
}