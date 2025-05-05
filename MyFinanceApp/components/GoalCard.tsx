import { Goal } from "@/usehooks/type";
import { Card, Text } from "@rneui/themed";

export function GoalCard({ goal }: { goal: Goal }) {
    return (
        <Card key={goal.goalId}>
            <Card.Title>{goal.name}</Card.Title>
            <Card.Divider />
            <Text>Amount: {goal.amount.toLocaleString?.("en-US", {
                style: "currency",
                currency: "USD",
            })}</Text>
            {goal.description && <Text>Description: {goal.description}</Text>}
            {goal.deadlineDate && (<Text>Pay Date: {new Date(goal.deadlineDate).toLocaleDateString()}</Text>)}
        </Card >

    )

};