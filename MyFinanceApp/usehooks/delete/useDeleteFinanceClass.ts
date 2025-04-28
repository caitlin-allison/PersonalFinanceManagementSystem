import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { UpdateBill, UpdateIncome, UpdateGoal, DeleteGoal, DeleteBill, DeleteIncome } from "../type";
import { useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

export function useDeleteFinanceClass(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: deleteFinanceType,
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
    formData: DeleteGoal
}
interface BillFormData {
    type: PersonalFinanceClasses.EXPENSE,
    formData: DeleteBill
}
interface IncomeFormData {
    type: PersonalFinanceClasses.INCOME,
    formData: DeleteIncome
}

async function deleteFinanceType(newFinanceClass: GoalFormData | BillFormData | IncomeFormData) {
    const { type, formData } = newFinanceClass;

    const db = useSQLiteContext();

    const result = await db.runAsync('');
    return result;
}