import { Bill } from "@/usehooks/type";
import { Card, Text } from "@rneui/themed";

export function BillCard({ bill }: { bill: Bill }) {
    return (
        <Card>
            <Card.Title>{bill.name}</Card.Title>
            <Card.Divider />
            <Text>Amount: {bill.amount.toLocaleString?.("en-US", {
                style: "currency",
                currency: "USD",
            })}</Text>
            <Text>Category: {bill.category}</Text>
            {bill.payDate && (<Text>Pay Date: {new Date(bill.payDate).toLocaleDateString()}</Text>)}
        </Card>

    )

};