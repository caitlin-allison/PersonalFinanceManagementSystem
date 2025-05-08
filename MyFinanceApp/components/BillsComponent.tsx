import { useFinanceType } from "@/usehooks/get/useFinanceClass";
import { PersonalFinanceClasses } from "@/utils/types";
import { Text } from "@rneui/themed";
import { ScrollView } from "react-native";
import { BillCard } from "./BillCard";
import { Bill } from "@/usehooks/type";

export default function BillsComponent() {

    const { data: bills } = useFinanceType(PersonalFinanceClasses.EXPENSE);

    return (<>
        <ScrollView>
            {/* Loop through the bills and render a BillCard for each one */}
            {bills?.map((bill) => (
                <BillCard key={(bill as Bill).billID} bill={bill as Bill} />
            ))}
            {bills?.length === 0 && <Text>No bills found</Text>}
        </ScrollView>
    </>);
}