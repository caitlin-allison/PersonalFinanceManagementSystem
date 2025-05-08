import { Goal } from "@/usehooks/type";
import { Card, Text } from "@rneui/themed";
import { View } from "react-native";

export function GoalCard({ goal }: { goal: Goal }) {
    return (
        <Card key={goal.goalID}>
            <Card.Title>{goal.name}</Card.Title>
            <Card.Divider />
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontWeight: "bold" }}>Amount: </Text>
                <Text>{goal.amount.toLocaleString?.("en-US", {
                    style: "currency",
                    currency: "USD",
                })}</Text>
            </View>
            {goal.description && (
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Description: </Text>
                    <Text>{goal.description}</Text>
                </View>)}
            {goal.date && goal.hasDeadline && (
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold" }}>Deadline: </Text>
                    <Text>{goal.date.toLocaleDateString()}</Text>
                </View>)}
        </Card >

    )

};