import { IncomeCategory } from "@/utils/types";

export type User = {
    userID: number;
    name: string;
    email: string;
    phone: string;
    pin: string;
}

export type Income = {
    id: number;
    userId: number;
    amount: number;
    isMonthly: boolean;
    payDate: Date | null;
    category: IncomeCategory;
    description: string;
    name: string;
};

export type Goal = {
    goalID: number;
    userId: number;
    name: string;
    amount: number;
    hasDeadline: boolean;
    date: Date | null;
    description: string;
    category: string;

}

export type Bill = {
    billID: number;
    userId: number;
    name: string;
    amount: number;
    isMonthly: boolean;
    date: Date | null;
    description: string;
    category: string;
}

type DeleteFlag = {
    deleteFlag: 'Y' | 'N';
    id: number;
}

export type CreateUser = Omit<User, "userID" | "createdAt" | "updatedAt">;
export type CreateIncome = Omit<Income, "id" | "createdAt" | "updatedAt">;
export type CreateGoal = Omit<Goal, "goalID" | "createdAt" | "updatedAt">;
export type CreateBill = Omit<Bill, "billID" | "createdAt" | "updatedAt">;

export type UpdateUser = Omit<User, "createdAt" | "updatedAt">;
export type UpdateIncome = Omit<Income, "createdAt" | "updatedAt">;
export type UpdateGoal = Omit<Goal, "createdAt" | "updatedAt">;
export type UpdateBill = Omit<Bill, "createdAt" | "updatedAt">;

export type DeleteUser = DeleteFlag;
export type DeleteIncome = DeleteFlag;
export type DeleteGoal = DeleteFlag;
export type DeleteBill = DeleteFlag;
