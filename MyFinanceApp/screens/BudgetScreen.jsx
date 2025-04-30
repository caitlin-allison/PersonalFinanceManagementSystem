import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const testData = [
  { name: 'Food', population: 250, color: '#f39c12' },
  { name: 'Rent', population: 300, color: '#e74c3c' },
  { name: 'Utilities', population: 120, color: '#2ecc71' },
  { name: 'Entertainment', population: 150, color: '#9b59b6' },
];

// Calculate total
const total = testData.reduce((sum, item) => sum + item.population, 0);

// Clean pie data without labels or legends; tba new verison soon
const pieData = testData.map(item => ({
  population: item.population,
  color: item.color,
  legendFontColor: 'transparent',
  legendFontSize: 0,
}));

export default function BudgetScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Bar</Text>


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
          <View key={index} style={styles.labelItem}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <Text style={styles.labelText}>
              {item.name}: ${item.population}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
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
});
