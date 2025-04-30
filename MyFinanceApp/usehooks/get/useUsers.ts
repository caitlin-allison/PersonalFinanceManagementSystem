import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSQLiteContext } from "expo-sqlite";
import queryKeys from "../queryKeys";
import { User } from "../type";


export const useUsers = () => {
    return useQuery<User[]>({
        queryKey: queryKeys.users,
        queryFn: getUsers,
        // Tells the frontend to render this before the data is fetched
        placeholderData: [],
        // Tells the frontend to render this if the data is not fetched after 5 seconds
        // Not reccomended unless you already have data in the cache
        initialData: [],
    })
}

// Contro
async function getUsers() {
    const db = useSQLiteContext();
    const result = await db.getAllAsync('SELECT * FROM users');
    return result as User[];
}