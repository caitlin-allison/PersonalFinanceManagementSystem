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
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: type === PersonalFinanceClasses.INCOME ?
                    queryKeys.income(user?.userID ?? 0) :
                    type === PersonalFinanceClasses.EXPENSE ?
                        queryKeys.bill(user?.userID ?? 0) :
                        queryKeys.goal(user?.userID ?? 0),
            });
        },
    });
}

async function getFinanceType(
    type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>,
    db: SQLiteDatabase,
    userId: number
) {
    switch (type) {
        case PersonalFinanceClasses.INCOME:
            return await db.getAllAsync(incomeQuery, [userId]) as unknown as Income[];

            break;
        case PersonalFinanceClasses.EXPENSE:
            return await db.getAllAsync(billQuery, [userId]) as unknown as Bill[];

        case PersonalFinanceClasses.GOAL:
            return await db.getAllAsync(goalQuery, [userId]) as unknown as Goal[];


        default:
            throw new Error('Invalid type provided');
    }
}
const billQuery = `SELECT * FROM Bill WHERE userId = ?`;
const goalQuery = `
SELECT * FROM Goal WHERE userId = ?`;
const incomeQuery = `
SELECT * FROM Income WHERE userId = ?`;