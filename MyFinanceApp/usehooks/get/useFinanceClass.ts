import { useQuery, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Income, Goal, Bill } from "../type";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

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

    return useQuery<Goal[] | Bill[] | Income[]>({
        queryKey: type === PersonalFinanceClasses.INCOME
            ? queryKeys.income
            : type === PersonalFinanceClasses.EXPENSE
                ? queryKeys.bill
                : queryKeys.goal,
        queryFn: () => getFinanceType(type, db),
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
}

async function getFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>, db: SQLiteDatabase) {
    const userID = 1; // TODO: get user id from context or props

    switch (type) {
        case PersonalFinanceClasses.INCOME:
            return await db.getAllAsync(incomeQuery, [userID]) as unknown as Income[];

            break;
        case PersonalFinanceClasses.EXPENSE:
            return await db.getAllAsync(billQuery, [userID]) as unknown as Bill[];

        case PersonalFinanceClasses.GOAL:
            return await db.getAllAsync(goalQuery, [userID]) as unknown as Goal[];


        default:
            throw new Error('Invalid type provided');
    }
}
const billQuery = `SELECT * FROM Bill WHERE userId = ?`;
const goalQuery = `
SELECT * FROM Goal WHERE userId = ?`;
const incomeQuery = `
SELECT * FROM Income WHERE userId = ?`;