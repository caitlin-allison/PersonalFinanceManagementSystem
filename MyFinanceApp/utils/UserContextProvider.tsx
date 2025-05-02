import { User } from "@/usehooks/type";
import React from "react";

type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<
        React.SetStateAction<User | null>
    >;
};

const UserContext = React.createContext<UserContextType>({
    user: null,
    setUser: () => { },
});
export function useUser() {
    return React.useContext(UserContext);
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
    const [user, setUser] = React.useState<User | null>(null);

    return (
        <UserContext.Provider
            value={{

                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}