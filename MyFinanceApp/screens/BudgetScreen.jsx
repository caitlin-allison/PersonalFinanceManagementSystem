import { useFinanceType } from '@/usehooks/get/useFinanceClass';
import RNPickerSelect from 'react-native-picker-select';
import { PersonalFinanceClasses } from '@/utils/types';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { breakStringAndUppercase } from '@/utils/breakStringAndUppercase';

export default function BudgetScreen() {
  const screenWidth = Dimensions.get('window').width;

  // Data from income and expenses
  const { data: income } = useFinanceType(PersonalFinanceClasses.INCOME);
  const { data: expenses } = useFinanceType(PersonalFinanceClasses.EXPENSE);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // 0–11


  const [selectedCategory, setSelectedCategory] = useState(null);

  //Group expenses by month
  const filteredExpenses = expenses?.filter(bill => {
    const date = new Date(bill.payDate);
    return date.getMonth() === selectedMonth;
  }) || [];


  // Group expenses by category and calculate totals
  const grouped = expenses?.reduce((acc, bill) => {
    const category = bill.category || 'Other';

    if (!acc[category]) {
      acc[category] = {
        total: 0,
        items: [],
      };
    }

    acc[category].total += bill.amount;
    acc[category].items.push({ name: bill.name, amount: bill.amount });

    return acc;
  }, {}) || {};

  const colorPalette = ['#f39c12', '#e74c3c', '#2ecc71', '#9b59b6', '#3498db', '#1abc9c', '#34495e'];

  // Build chart and breakdown data
  const testData = Object.entries(grouped).map(([category, data], index) => ({
    name: category,
    population: data.total,
    color: colorPalette[index % colorPalette.length],
  }));
  // Sort data by amount
  const categoryItems = Object.entries(grouped).reduce((acc, [category, data]) => {
    acc[category] = data.items;
    return acc;
  }, {});
  const total = testData.reduce((sum, item) => sum + item.population, 0);
  // Sort testData by population
  const pieData = testData.map(item => ({
    population: item.population,
    color: item.color,
    legendFontColor: 'transparent',
    legendFontSize: 0,
  }));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Month (Coming Soon):</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            console.log('Selected month:', monthNames[value]);
          }}
          value={selectedMonth}
          items={monthNames.map((month, index) => ({
            label: month,
            value: index,
          }))}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => <Text style={{ fontSize: 16 }}>▼</Text>}
        />

      </View>
      <PieChart
        data={pieData}
        width={screenWidth}
        height={250}
        chartConfig={{ color: () => '#000' }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="100"
        hasLegend={false}
      />

      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

      <View style={styles.labelGrid}>
        {testData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.labelItem}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === item.name ? null : item.name
              )
            }
          >
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.labelText}>
              {breakStringAndUppercase(item.name)}: ${item.population.toFixed(2)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory && (
        <View style={styles.detailsSection}>
          <Text style={styles.detailsHeader}>{breakStringAndUppercase(selectedCategory)} Breakdown</Text>
          {categoryItems[selectedCategory]?.map((item, idx) => (

            //delete item from category... add later

            <View key={idx} style={styles.detailsItem}>
              <Text style={styles.detailsName}>{breakStringAndUppercase(item.name)}</Text>
              <Text style={styles.detailsAmount}>${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 50, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  total: { fontSize: 18, marginBottom: 20, color: '#333' },

  labelGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
    paddingHorizontal: 10,
  },
  labelItem: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: 5,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  labelText: {
    fontSize: 16,
    color: '#333',
  },
  detailsSection: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsName: {
    fontSize: 16,
    color: '#444',
  },
  detailsAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  monthPicker: {
    marginBottom: 10,
    width: '90%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  monthButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  selectedMonthButton: {
    backgroundColor: '#3498db',
  },
  monthButtonText: {
    color: '#333',
  },
  selectedMonthButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    width: 200,
    marginBottom: 20,
  },

});

// Needs both IOS and Android styles for RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    color: '#333',
    backgroundColor: '#fff',
    paddingRight: 30,
    height: 38,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    color: '#333',
    backgroundColor: '#fff',
    paddingRight: 30,
    height: 38,
  },
  iconContainer: {
    top: 10,
    right: 10,
  },
});
