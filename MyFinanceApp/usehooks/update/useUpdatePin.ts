import { useMutation, useQueryClient } from "@tanstack/react-query";
import queryKeys from "../queryKeys";
import { UpdateUser, User } from "../type";
import { useSQLiteContext } from "expo-sqlite";

export function useUpdatePin() {
    const queryClient = useQueryClient();
    const query = useMutation({
        mutationFn: updatePin,
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users,
            });
        },
    });
    return query;
}

async function updatePin(newUser: UpdateUser) {
    const db = useSQLiteContext();

    const result = await db.runAsync(
        `UPDATE users 
        SET name = $name,
        email = $email, 
        pin = $pin 
        WHERE id = $id`,
        [newUser.name, newUser.email, newUser.pin]
    );
    return result;
}