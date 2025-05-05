import { Bill } from "@/usehooks/type";
import { Card, Icon, Text } from "@rneui/themed";
import { View } from "react-native";

export function BillCard({ bill }: { bill: Bill }) {
    return (
        <Card key={bill.billID}>
            <Card.Title>{bill.name}</Card.Title>
            <Card.Divider />
            {bill.isMonthly && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon
                        name="currency-exchange"
                        type="material"
                        color="green"
                        size={20}
                        style={{ marginRight: 5 }}
                    />
                    <Text style={{ color: "green" }}>Monthly</Text>

                </View>)}
            <Text>Amount: {bill.amount.toLocaleString?.("en-US", {
                style: "currency",
                currency: "USD",
            })}</Text>
            <Text>Category: {bill.category}</Text>
            {bill.payDate && (<Text>Pay Date: {new Date(bill.payDate).toLocaleDateString()}</Text>)}
        </Card>

    )

};