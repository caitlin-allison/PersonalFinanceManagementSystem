import { useQuery } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import queryKeys from "../queryKeys";
import { User } from "../type";


export function useUsers() {
    const db = useSQLiteContext();

    return useQuery<User[]>({
        queryKey: queryKeys.users,
        queryFn: async () => {
            const result = await db.getAllAsync('SELECT * FROM User');
            return result as User[];
        },
        // Tells the frontend to render this before the data is fetched
        placeholderData: [],
        // Tells the frontend to render this if the data is not fetched after 5 seconds
        // Not reccomended unless you already have data in the cache
        initialData: [],
    })
}