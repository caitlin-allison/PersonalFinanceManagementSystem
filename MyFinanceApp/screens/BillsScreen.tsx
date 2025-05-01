import BillsComponent from '@/components/BillsComponent';
import { useFinanceType } from '@/usehooks/get/useFinanceClass';
import { PersonalFinanceClasses } from '@/utils/types';
import React from 'react';

export default function BillsScreen() {
    // Data for Bills
    const { data: bills } = useFinanceType(PersonalFinanceClasses.EXPENSE);

    return <BillsComponent />
}
