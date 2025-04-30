import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { UpdateBill, UpdateIncome, UpdateGoal } from "../type";
import { useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

export function useUpdateFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: updateFinanceType,
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
    formData: UpdateGoal
}
interface BillFormData {
    type: PersonalFinanceClasses.EXPENSE,
    formData: UpdateBill
}
interface IncomeFormData {
    type: PersonalFinanceClasses.INCOME,
    formData: UpdateIncome
}

async function updateFinanceType(newFinanceClass: GoalFormData | BillFormData | IncomeFormData) {
    const { type, formData } = newFinanceClass;

    const db = useSQLiteContext();

    const result = await db.runAsync('');
    return result;
}