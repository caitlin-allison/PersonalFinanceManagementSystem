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

    switch (type) {
        case PersonalFinanceClasses.INCOME:
            return await db.runAsync(updateIncomeQuery, [
                formData.name,
                formData.amount,
                formData.isMonthly,
                formData.payDate ? formData.payDate.toISOString() : null,
                formData.description,
                formData.category,
                formData.id
            ]) as unknown as UpdateIncome[];
        case PersonalFinanceClasses.EXPENSE:
            return await db.runAsync(
                updateBillQuery,
                [
                    formData.name,
                    formData.amount,
                    formData.isMonthly,
                    formData.payDate ? formData.payDate.toISOString() : null,
                    formData.description,
                    formData.category,
                    formData.id,
                ]) as unknown as UpdateBill[];
        case PersonalFinanceClasses.GOAL:
            return await db.runAsync(
                updateGoalQuery,
                [
                    formData.name,
                    formData.amount,
                    formData.hasDeadline,
                    formData.deadlineDate ? formData.deadlineDate.toISOString() : null,
                    formData.description,
                    formData.id
                ]) as unknown as UpdateGoal[];
        default: throw new Error('Invalid type provided');
    }
}
const updateGoalQuery = `
UPDATE Goal
SET Name = ?, Amount = ?, HasDeadli//ne = ?, Date = ?, Description = ?
WHERE GoalID = ?
`;

const updateBillQuery = `
UPDATE Bill
SET Name = ?, Amount = ?, IsMonthly = ?, Date = ?, Description = ?, Category = ?
WHERE BillID = ?
`;

const updateIncomeQuery = `
UPDATE Income
SET Name = ?, Amount = ?, IsMonthly = ?, Date = ?, Description = ?, Category = ?
WHERE IncomeID = ?
`;