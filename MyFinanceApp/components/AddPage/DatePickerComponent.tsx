import { Input } from "@rneui/themed";
import React, { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerComponentProps {
    date: Date;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export function DatePickerComponent({ date, setDate }: DatePickerComponentProps) {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

    return (
        <>
            {showDatePicker && (<RNDateTimePicker
                mode="date"
                value={date}
                onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || date;
                    setDate(currentDate);
                    setShowDatePicker(false);
                }}
                display="calendar"
            />)}
            <Input
                placeholder="Date"
                value={date.toLocaleDateString()}
                onPress={() => setShowDatePicker(true)}
            />
        </>
    );
};