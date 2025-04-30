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
    formData: CreateBill
}
interface IncomeFormData {
    type: PersonalFinanceClasses.INCOME,
    formData: CreateIncome
}




async function createFinanceClass(newFinanceClass: GoalFormData | BillFormData | IncomeFormData) {
    const { type, formData } = newFinanceClass;

    const userID = 0;
    const db = useSQLiteContext();

    // Call the database function to create a new Finance Class
    // Implement the logic to create a new Finance Class based on the type

    switch (type) {
        case PersonalFinanceClasses.INCOME:
            return await db.runAsync(createIncomeQuery, [
                userID,
                formData.name,
                formData.amount,
                formData.isMonthly,
                formData.payDate ? formData.payDate.toISOString() : null,
                formData.description,
                formData.category
            ]) as unknown as CreateIncome[];
        case PersonalFinanceClasses.EXPENSE:
            return await db.runAsync(
                createBillQuery,
                [
                    userID,
                    formData.name,
                    formData.amount,
                    formData.isMonthly,
                    formData.payDate ? formData.payDate.toISOString() : null,
                    formData.description,
                    formData.category
                ]
            ) as unknown as CreateBill[];
        case PersonalFinanceClasses.GOAL:
            return await db.runAsync(
                createGoalQuery,
                [
                    userID,
                    formData.name,
                    formData.amount,
                    formData.hasDeadline,
                    formData.deadlineDate ? formData.deadlineDate.toISOString() : null,
                    formData.description
                ]
            ) as unknown as CreateGoal[];

    }
}

const createIncomeQuery = `
INSERT INTO Income (UserID, Name, Amount, IsMonthly, Date, Description, Category)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;
const createBillQuery = `
INSERT INTO Bill (UserID, Name, Amount, IsMonthly, Date, Description, Category)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;
const createGoalQuery = `
INSERT INTO Goal (UserID, Name, Amount, HasDeadline, Date, Description)
VALUES (?, ?, ?, ?, ?, ?)
`;
