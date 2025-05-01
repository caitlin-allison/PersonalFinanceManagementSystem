import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFinanceType } from '@/usehooks/get/useFinanceClass';
import { PersonalFinanceClasses } from '@/utils/types';

export default function GoalsScreen({ navigation }) {
  // Data for goals
  const { data: goals } = useFinanceType(PersonalFinanceClasses.GOAL);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});
