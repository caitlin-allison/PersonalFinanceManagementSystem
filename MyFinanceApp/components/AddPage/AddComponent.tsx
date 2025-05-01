import { getPersonalFinanceClassIcon } from "@/utils/getPersonalFinanceClassIcon";
import { PersonalFinanceClasses } from "@/utils/types";
import { Tab } from "@rneui/themed";
import React, { useState } from "react";
import { AddBillComponent } from "./AddBillComponent";
import { AddIncomeComponent } from "./AddIncomeComponent";
import { AddGoalComponent } from "./AddGoalComponent";
import { IconProps, TabView } from "@rneui/base";

export function AddComponent() {

    // Tracks the selected tab index
    // - 0 for Income
    // - 1 for Bill
    // - 2 for Goal
    const [selectedIndex, setSelectedIndex] = useState(0);

    const iconProps: Partial<IconProps> = {
        color: 'white',
    }

    return (
        <>
            <Tab
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(e)}
                indicatorStyle={{
                    backgroundColor: 'white',
                    height: 3,
                }}
                variant="primary"
            >
                <Tab.Item
                    title="Income"
                    titleStyle={{ fontSize: 12 }}
                    icon={getPersonalFinanceClassIcon(PersonalFinanceClasses.INCOME, iconProps as IconProps)}
                />
                <Tab.Item
                    title="Bill"
                    titleStyle={{ fontSize: 12 }}
                    icon={getPersonalFinanceClassIcon(PersonalFinanceClasses.EXPENSE, iconProps as IconProps)}
                />
                <Tab.Item
                    title="Goal"
                    titleStyle={{ fontSize: 12 }}
                    icon={getPersonalFinanceClassIcon(PersonalFinanceClasses.GOAL, iconProps as IconProps)}
                />
            </Tab>
            <TabView value={selectedIndex} onChange={setSelectedIndex} animationType="timing">
                <TabView.Item>
                    <AddIncomeComponent />
                </TabView.Item>
                <TabView.Item>
                    <AddBillComponent />
                </TabView.Item>
                <TabView.Item>
                    <AddGoalComponent />
                </TabView.Item>
            </TabView>
        </>
    );
}