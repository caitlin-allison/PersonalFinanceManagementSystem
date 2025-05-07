import { PersonalFinanceClasses } from "@/utils/types";

const queryKeys = {
    users: ['users'] as const,
    all: ['finance'] as const,
    account: (id: number) => ['finance', id] as const,
    income: (id: number) => ['finance', id, PersonalFinanceClasses.INCOME] as const,
    bill: (id: number) => ['finance', id, PersonalFinanceClasses.EXPENSE] as const,
    goal: (id: number) => ['finance', PersonalFinanceClasses.GOAL] as const,


}


export default queryKeys;