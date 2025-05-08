import { useQuery, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Income, Goal, Bill } from "../type";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";
import { useUser } from "@/utils/UserContextProvider";

/**
 * 
 * @param type - The type of the finance class to be used in the query key.
 * @returns Returns the query object containing the data and the status of the query.
 * @example
 * const { data, status } = useFinanceType(PersonalFinanceClasses.INCOME) as Income[];
*/
export function useFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const db = useSQLiteContext();
    const queryClient = useQueryClient();
    const { user } = useUser();
    const userId = user?.userID;

    return useQuery<Goal[] | Bill[] | Income[]>({
        queryKey: type === PersonalFinanceClasses.INCOME
            ? queryKeys.income(user?.userID ?? 0)
            : type === PersonalFinanceClasses.EXPENSE
                ? queryKeys.bill(user?.userID ?? 0)
                : queryKeys.goal(user?.userID ?? 0),
        queryFn: () => getFinanceType(type, db, user?.userID ?? 0),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });
}

async function getFinanceType(
    type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>,
    db: SQLiteDatabase,
    userId: number
) {
    switch (type) {
        case PersonalFinanceClasses.INCOME:
            const income = await db.getAllAsync(incomeQuery, [userId]) as unknown as Income[];
            income.forEach((income) => {
                // Convert the date UTC string to a Date object
                if (income.payDate) {
                    income.payDate = new Date(income.payDate);
                }
                // Convert isMonthly to boolean
                income.isMonthly = `${income.isMonthly}` === "1" ? true : false;
            });
            return income as Income[];
        case PersonalFinanceClasses.EXPENSE:
            const bills = await db.getAllAsync(billQuery, [userId]) as unknown as Bill[];
            bills.forEach((bill) => {
                // Convert the date UTC string to a Date object
                if (bill.date) {
                    bill.date = new Date(bill.date);
                }
                // Convert isMonthly to boolean
                bill.isMonthly = `${bill.isMonthly}` === "1" ? true : false;
            });
            return bills as Bill[];

        case PersonalFinanceClasses.GOAL:
            const goals = await db.getAllAsync(goalQuery, [userId]) as unknown as Goal[];
            goals.forEach((goal) => {
                // Convert the date UTC string to a Date object
                if (goal.date) {
                    goal.date = new Date(goal.date);
                }
                // Convert hasDeadline to boolean
                goal.hasDeadline = `${goal.hasDeadline}` === "1" ? true : false;
            });
            return goals as Goal[];

        default:
            throw new Error('Invalid type provided');
    }
}
const billQuery = `SELECT * FROM Bill WHERE userId = ?`;
const goalQuery = `
SELECT * FROM Goal WHERE userId = ?`;
const incomeQuery = `
SELECT * FROM Income WHERE userId = ?`;