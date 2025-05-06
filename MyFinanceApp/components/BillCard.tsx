import { Bill } from "@/usehooks/type";
import { breakStringAndUppercase } from "@/utils/breakStringAndUppercase";
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: 700 }}>Amount: </Text>
                <Text>{bill.amount.toLocaleString?.("en-US", {
                    style: "currency",
                    currency: "USD",
                })}</Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontWeight: 700 }}>Category: </Text><Text>{breakStringAndUppercase(bill.category)}</Text>
            </View>
            {!!bill.description && (<View>
                <Text style={{ fontWeight: 700 }}>Description:</Text>
                <Text>{bill.description}</Text>
            </View>)}
            {bill.payDate && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ fontWeight: 700 }}>Pay Date:</Text>
                    <Text>{new Date(bill.payDate).toLocaleDateString()}</Text>
                </View>)}
        </Card>

    )

};