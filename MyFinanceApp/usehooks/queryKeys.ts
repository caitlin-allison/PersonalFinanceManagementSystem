import { PersonalFinanceClasses } from "@/utils/types";

const queryKeys = {
    users: ['users'] as const,
    income: [PersonalFinanceClasses.INCOME] as const,
    bill: [PersonalFinanceClasses.EXPENSE] as const,
    goal: [PersonalFinanceClasses.GOAL] as const,


}


export default queryKeys;