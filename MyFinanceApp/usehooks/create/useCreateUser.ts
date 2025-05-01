import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { CreateUser } from "../type";
import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

export function useCreateUser() {
    const db = useSQLiteContext();
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: (user: CreateUser) => createUser(user, db),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
    return query;
}

async function createUser(newUser: CreateUser, db: SQLiteDatabase) {
    const result = await db.runAsync(
        `INSERT INTO User (name, email, phone, pin)
        VALUES (?, ?, ?, ?)
        `,
        [newUser.name, newUser.email, newUser.phone, newUser.pin]
    );
    return result;
}