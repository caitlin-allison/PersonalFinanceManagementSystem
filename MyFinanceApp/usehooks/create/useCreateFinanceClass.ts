import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { CreateGoal, CreateBill, CreateIncome } from "../type";
import { SQLiteDatabase } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";
import { useUser } from "@/utils/UserContextProvider";

export function useCreateFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>, db: SQLiteDatabase) {
    const queryClient = useQueryClient();
    const { user } = useUser();
    const userId = user?.userID as number;

    const query = useMutation({
        mutationFn: (newFinanceClass: GoalFormData | BillFormData | IncomeFormData) =>
            createFinanceClass(db, newFinanceClass, userId ?? 0),
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




async function createFinanceClass(
    db: SQLiteDatabase,
    newFinanceClass: GoalFormData | BillFormData | IncomeFormData,
    userId: number
) {
    const { type, formData } = newFinanceClass;

    console.log("Creating finance class:", type, formData);

    try {
        // Based on the type, run the appropriate query with the provided data
        switch (type) {
            case PersonalFinanceClasses.INCOME:
                return await db.runAsync(createIncomeQuery, [
                    userId,
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
                        userId,
                        formData.name,
                        formData.amount,
                        formData.isMonthly,
                        formData.date ? formData.date.toISOString() : null,
                        formData.description,
                        formData.category
                    ]
                ) as unknown as CreateBill[];
            case PersonalFinanceClasses.GOAL:
                return await db.runAsync(
                    createGoalQuery,
                    [
                        userId,
                        formData.name,
                        formData.amount,
                        formData.hasDeadline,
                        formData.date ? formData.date.toISOString() : null,
                        formData.description
                    ]
                ) as unknown as CreateGoal[];

        }
    } catch (error) {
        console.error("Error creating finance class:", error);
        throw error;
    }
}

const createIncomeQuery = `
INSERT INTO Income (userID, name, amount, isMonthly, date, description, category)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;
const createBillQuery = `
INSERT INTO Bill (userID, name, amount, isMonthly, date, description, category)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;
const createGoalQuery = `
INSERT INTO Goal (userID, name, amount, hasDeadline, date, description)
VALUES (?, ?, ?, ?, ?, ?)
`;
