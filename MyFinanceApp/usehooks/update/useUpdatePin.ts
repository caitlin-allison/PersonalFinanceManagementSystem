import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { UpdateUser } from "../type";
import { useSQLiteContext } from "expo-sqlite";

export function useUpdatePin() {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: async (newUser: UpdateUser) => {
            const db = useSQLiteContext();

            const result = await db.runAsync(`
                UPDATE users 
                    SET name = ?,
                    email = ?, 
                    pin = ? 
                    WHERE userID = ?`,
                [newUser.name, newUser.email, newUser.pin, newUser.id]
            );
            return result;
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
    return query;
}