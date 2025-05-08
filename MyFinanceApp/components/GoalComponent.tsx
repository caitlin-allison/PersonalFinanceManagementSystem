import { useFinanceType } from "@/usehooks/get/useFinanceClass";
import { PersonalFinanceClasses } from "@/utils/types";
import { Text } from "@rneui/themed";
import { ScrollView } from "react-native";
import { Goal } from "@/usehooks/type";
import { GoalCard } from "./GoalCard";

export default function GoalComponent() {

    const { data: goals } = useFinanceType(PersonalFinanceClasses.GOAL);

    return (<>
        <ScrollView>
            {/* Loop through the goals and render a GoalCard for each one */}
            {goals?.map((goal) => (
                <GoalCard key={`${(goal as Goal).goalID}}-${goal.name}`} goal={goal as Goal} />
            ))}
            {goals?.length === 0 && <Text>No goals found</Text>}
        </ScrollView>
    </>);
}