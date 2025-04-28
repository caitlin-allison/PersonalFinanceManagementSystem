import { QueryKey, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { Income, Goal, Bill } from "../type";
import { useSQLiteContext } from "expo-sqlite";
import { PersonalFinanceClasses } from "@/utils/types";

/**
 * 
 * @param type - The type of the finance class to be used in the query key.
 * @returns Returns the query object containing the data and the status of the query.
 * @example
 * const { data, status } = useFinanceType(PersonalFinanceClasses.INCOME) as Income[];
*/
export function useFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {
    const queryClient = useQueryClient();


    return useQuery<Goal[] | Bill[] | Income[]>({
        queryKey: type === PersonalFinanceClasses.INCOME
            ? queryKeys.income
            : type === PersonalFinanceClasses.EXPENSE
                ? queryKeys.bill
                : queryKeys.goal,
        queryFn: () => getFinanceType(type),
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

async function getFinanceType(type: Omit<PersonalFinanceClasses, PersonalFinanceClasses.BUDGET>) {

    const db = useSQLiteContext();

    const result = await db.runAsync('');
    return result as unknown as Goal[] | Bill[] | Income[];
}