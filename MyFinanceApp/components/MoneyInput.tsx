import React, { useState } from "react";
import { View } from "react-native";
import { Input } from "@rneui/base";

export function MoneyInput({
    value,
    setValue,
    placeholder = "$0.00",
    label = "Amount",
}: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    placeholder?: string;
    label?: string;
}) {
    const [moneyValue, setMoneyValue] = useState<string>(value.toFixed(2));
    const handleChangeText = (text: string) => {
        // Keep only numeric input and a single dot
        const numericText = text.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

        setMoneyValue(numericText);

        // Parse the numeric value or default to 0
        const numericValue = parseFloat(numericText) || 0;
        setValue(numericValue);
    };

    const handleBlur = () => {
        // Format the value to two decimal places on blur
        const formattedValue = parseFloat(moneyValue) || 0;
        setMoneyValue(formattedValue.toFixed(2));
    };




    return (
        <Input
            label={label}
            placeholder={placeholder}
            keyboardType="numeric"
            value={moneyValue}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            leftIcon={{
                type: "material",
                name: "attach-money",
            }}
        />
    );
}
