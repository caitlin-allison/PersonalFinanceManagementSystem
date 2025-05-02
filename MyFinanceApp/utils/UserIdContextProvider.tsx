import React from "react";

type UserIdContextType = {
    userId: number | null;
    setUserId: React.Dispatch<
        React.SetStateAction<number | null>
    >;
};

const UserId = React.createContext<UserIdContextType>({
    userId: null,
    setUserId: () => { },
});
export function useUserId() {
    return React.useContext(UserId);
}

/**
 * 
 * @param children - The application
 * @returns Context provider for the user Id
 * TLDR: it provides access to the user Id anywhere within the application
 */
export function UserIdProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userId, setUserId] = React.useState<
        number | null>(null);

    return (
        <UserId.Provider
            value={{

                userId,
                setUserId,
            }}
        >
            {children}
        </UserId.Provider>
    );
}