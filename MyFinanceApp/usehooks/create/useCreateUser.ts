import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { CreateUser } from "../type";
import { useSQLiteContext } from "expo-sqlite";

export function useCreateUser() {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: createUser,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
    return query;
}

async function createUser(newUser: CreateUser) {
    const db = useSQLiteContext();

    const result = await db.runAsync(
        `INSERT INTO users (name, email, pin) VALUES (?, ?, ?)`,
        [newUser.name, newUser.email, newUser.pin]
    );
    return result;
}