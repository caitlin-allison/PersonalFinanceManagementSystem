import { BillCategory, IncomeCategory, PersonalFinanceClasses } from "@/utils/types";
import { useTheme } from "@rneui/themed";
import React, { useState } from "react";
import { View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface BillCategoryType {
    value: keyof BillCategory | null;
    setValue: React.Dispatch<React.SetStateAction<keyof BillCategory | null>>;
    type: PersonalFinanceClasses.EXPENSE;
}

interface IncomeCategoryType {
    value: keyof IncomeCategory | null;
    setValue: React.Dispatch<React.SetStateAction<keyof IncomeCategory | null>>;
    type: PersonalFinanceClasses.INCOME;
}

// Union type for the props
// Auto detects the type based on the type prop
type Props = BillCategoryType | IncomeCategoryType;

/**
 * 
 * @param value - The selected value of the dropdown
 * @returns setValue - Function to set the selected value of the dropdown
 * @param type - The type of the dropdown (expense or income)
 */
const DropdownComponent = ({ value, setValue, type }: Props) => {
    const [isFocus, setIsFocus] = useState(false);

    const theme = useTheme();

    // Determine Selectable data based on the type
    const data = type === PersonalFinanceClasses.EXPENSE ?
        Object.entries(BillCategory).map(([key, value]) => ({ label: value, value: key })) :
        Object.entries(IncomeCategory).map(([key, value]) => ({ label: value, value: key }));


    return (
        <View style={{ width: '100%', padding: 10 }} >
            < Dropdown
                style={[isFocus && {
                    borderColor: 'blue',
                }, {
                    padding: 10,
                    borderBottomColor: theme.theme.colors.grey4,
                    borderBottomWidth: 2,
                }]}
                placeholderStyle={{ fontSize: 18, color: theme.theme.colors.grey3 }}
                selectedTextStyle={{ fontSize: 18 }}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Category'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: { label: string, value: keyof BillCategory }) => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            />
        </View >
    );
}
export default DropdownComponent;