import React, { useState } from "react";
import { Input } from "@rneui/base";

/**
 * 
 * @param value - The value of the money input
 * @param setValue - Function to set the value of the money input
 * @param placeholder - Placeholder text for the input
 * @param label - Label for the input
 * @returns A money input component that formats the input value to two decimal places
 * @description This component is used to input money values. It formats the input value to two decimal places and allows only numeric input and a single dot. The value is stored as a number in the state.
 */
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

    // Handle text input changes
    // - Keep only numeric input and a single dot
    // - Set the value in the state
    // - Parse the numeric value or default to 0
    const handleChangeText = (text: string) => {
        // Keep only numeric input and a single dot
        const numericText = text.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");

        setMoneyValue(numericText);

        // Parse the numeric value or default to 0
        const numericValue = parseFloat(numericText) || 0;
        setValue(numericValue);
    };

    // Format the value to two decimal places on blur
    // - Parse the numeric value or default to 0
    // - Set the value in the state
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
