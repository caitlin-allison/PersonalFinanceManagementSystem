import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { UpdateBill, UpdateIncome, UpdateGoal } from "../type";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

export function useUpdateFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const db = useSQLiteContext();
    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: (form: GoalFormData | IncomeFormData | BillFormData) => updateFinanceType(form, db),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.all,
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

async function updateFinanceType(newFinanceClass: GoalFormData | BillFormData | IncomeFormData, db: SQLiteDatabase) {
    const { type, formData } = newFinanceClass;

    switch (type) {
        case PersonalFinanceClasses.INCOME:
            return await db.runAsync(updateIncomeQuery, [
                formData.name,
                formData.amount,
                formData.isMonthly,
                formData.payDate ? formData.payDate.toISOString() : null,
                formData.description,
                formData.id
            ]) as unknown as UpdateIncome[];
        case PersonalFinanceClasses.EXPENSE:
            return await db.runAsync(
                updateBillQuery,
                [
                    formData.name,
                    formData.amount,
                    formData.isMonthly,
                    formData.date ? formData.date.toISOString() : null,
                    formData.description,
                    formData.category,
                    formData.billID,
                ]) as unknown as UpdateBill[];
        case PersonalFinanceClasses.GOAL:
            return await db.runAsync(
                updateGoalQuery,
                [
                    formData.name,
                    formData.amount,
                    formData.hasDeadline,
                    formData.date ? formData.date.toISOString() : null,
                    formData.description,
                    formData.goalID
                ]) as unknown as UpdateGoal[];
        default: throw new Error('Invalid type provided');
    }
}
const updateGoalQuery = `
    UPDATE Goal
        SET name = ?, 
        amount = ?, 
        hasDeadline = ?, 
        date = ?, 
        description = ?
    WHERE goalID = ?
`;

const updateBillQuery = `
    UPDATE Bill
        SET name = ?, 
        amount = ?, 
        isMonthly = ?, 
        date = ?, 
        description = ?, 
        category = ?
    WHERE billID = ?
`;

const updateIncomeQuery = `
    UPDATE Income
        SET name = ?, 
        amount = ?, 
        isMonthly = ?, 
        date = ?, 
        description = ?, 
        category = ?
    WHERE incomeID = ?
`;