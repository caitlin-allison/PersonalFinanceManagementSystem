import { Icon, IconProps } from "@rneui/themed";
import { PersonalFinanceClasses } from "./types";

export function getPersonalFinanceClassIcon(
    personalFinanceClass: PersonalFinanceClasses | keyof typeof PersonalFinanceClasses,
    props?: IconProps,
) {
    switch (personalFinanceClass) {
        case PersonalFinanceClasses.BUDGET:
            return <Icon
                name="account-balance-wallet"
                type="material"
                {...props}
            />;
        case "BUDGET":
            return <Icon
                name="account-balance-wallet"
                type="material"
                {...props}
            />;
        case PersonalFinanceClasses.EXPENSE:
            return <Icon
                name="add-card"
                type="material"
                {...props}
            />;
        case "EXPENSE":
            return <Icon
                name="add-card"
                type="material"
                {...props}
            />;
        case PersonalFinanceClasses.INCOME:
            return <Icon
                name="attach-money"
                type="material"
                {...props}
            />;
        case "INCOME":
            return <Icon
                name="attach-money"
                type="material"
                {...props}
            />;
        case "GOAL":
            return <Icon
                name="savings"
                type="material"
                {...props}
            />;
        case PersonalFinanceClasses.GOAL:
            return <Icon
                name="savings"
                type="material"
                {...props}
            />
        default:
            return <Icon
                name="add-outline"
                type="ionicon"
                {...props}
            />;
    }
}