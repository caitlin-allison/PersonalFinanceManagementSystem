import { PersonalFinanceClasses } from "@/utils/types";

const queryKeys = {
    users: ['users'] as const,
    all: ['finance'] as const,
    income: ['finance', PersonalFinanceClasses.INCOME] as const,
    bill: ['finance', PersonalFinanceClasses.EXPENSE] as const,
    goal: ['finance', PersonalFinanceClasses.GOAL] as const,


}


export default queryKeys;