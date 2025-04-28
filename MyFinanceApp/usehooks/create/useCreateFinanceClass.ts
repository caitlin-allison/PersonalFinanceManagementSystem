import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { CreateGoal, CreateBill, CreateIncome } from "../type";
import { useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

export function useCreateFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: createFinanceClass,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: type === PersonalFinanceClasses.INCOME ?
                    queryKeys.income :
                    type === PersonalFinanceClasses.EXPENSE ?
                        queryKeys.bill :
                        queryKeys.goal,
            });
        },
    });
    return query;
}

interface GoalFormData {
    type: PersonalFinanceClasses.GOAL,
    formData: CreateGoal
}
interface BillFormData {
    type: PersonalFinanceClasses.EXPENSE,
    formData: CreateGoal
}
interface IncomeFormData {
    type: PersonalFinanceClasses.INCOME,
    formData: CreateGoal
}




async function createFinanceClass(newFinanceClass: GoalFormData | BillFormData | IncomeFormData) {
    const { type, formData } = newFinanceClass;

    const db = useSQLiteContext();

    // Call the database function to create a new Finance Class
    // Implement the logic to create a new Finance Class based on the type

    // Working example
    const result = await db.runAsync(``
        // `INSERT INTO users (name, email, pin) VALUES (?, ?, ?)`,
        // [newUser.name, newUser.email, newUser.pin]
    );
    return result;
}