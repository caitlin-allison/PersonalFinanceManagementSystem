import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '@/utils/UserContextProvider';
import { useFinanceType } from '@/usehooks/get/useFinanceClass';
import { PersonalFinanceClasses } from '@/utils/types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  //Get user info from context
  const { user } = useUser();
  const userName = user?.name || 'User';
  const { data: income } = useFinanceType(PersonalFinanceClasses.INCOME);
  const { data: expenses } = useFinanceType(PersonalFinanceClasses.EXPENSE);
  // Calculate income, expenses, balance, and spending 
  const incomeTotal = income?.reduce((sum, i) => sum + i.amount, 0) || 0;
  const expenseTotal = expenses?.reduce((sum, e) => sum + e.amount, 0) || 0;
  const balance = incomeTotal - expenseTotal;
  const spendingPercent = incomeTotal > 0 ? (expenseTotal / incomeTotal) * 100 : 0;
  // Calculate spending and display emoji and status
  let emoji = '😎';
  let status = 'You’re crushing it!';
  if (spendingPercent > 75 && spendingPercent <= 100) {
    emoji = '😬';
    status = 'Caution: Close call';
  } else if (spendingPercent > 100) {
    emoji = '😱';
    status = 'Over budget!';
  }
  // Random quote generator for students
  const quotes = [
    "Don't save what is left after spending, spend what is left after saving. – Warren Buffett",
    "A budget is telling your money where to go instead of wondering where it went. – Dave Ramsey",
    "The goal isn’t more money. The goal is living life on your terms.",
    "Beware of little expenses. A small leak will sink a great ship. – Benjamin Franklin",
    "Live like no one else now, so later you can live like no one else. – Dave Ramsey"
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {userName}!</Text>
      <View style={styles.quoteBox}>
        <Text style={styles.quoteIcon}>💡</Text>
        <Text style={styles.quote}>{randomQuote}</Text>
      </View>

      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: '#d1f7c4' }]}>
          <MaterialIcons name="attach-money" size={24} color="#2e7d32" />
          <Text style={styles.cardLabel}>Income</Text>
          <Text style={styles.cardAmount}>${incomeTotal.toFixed(2)}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: '#fddede' }]}>
          <MaterialIcons name="money-off" size={24} color="#c62828" />
          <Text style={styles.cardLabel}>Expenses</Text>
          <Text style={styles.cardAmount}>${expenseTotal.toFixed(2)}</Text>
        </View>
      </View>

      <View style={[styles.card, styles.balanceCard]}>
        <Text style={styles.cardLabel}>Balance</Text>
        <Text style={styles.cardAmount}>${balance.toFixed(2)}</Text>
      </View>

      <View style={styles.visualizerContainer}>
        <AnimatedCircularProgress
          size={140}
          width={12}
          fill={Math.min(spendingPercent, 150)}
          tintColor={spendingPercent > 100 ? '#e74c3c' : '#3498db'}
          backgroundColor="#eee"
          duration={800}
          rotation={0}
        >
          {() => (
            <View style={styles.visualContent}>
              <Text style={styles.emoji}>{emoji}</Text>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 15,
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#eef9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  quoteIcon: {
    fontSize: 30,
    marginRight: 6,
    marginTop: 2,
  },
  quote: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#444',
    flexShrink: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
    marginTop: 20,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: '#f0f5ff',
    marginBottom: 20,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 15,
    marginTop: 6,
    color: '#555',
  },
  cardAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  visualizerContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    height: 200,
  },
  visualContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 15,
    color: '#333',
    textAlign: 'center',
  },
});
