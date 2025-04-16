import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';
import GoalsScreen from './screens/GoalsScreen';
import ExpensesScreen from './screens/ExpensesScreen';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerRightContainerStyle: { paddingRight: 15 },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Chart" component={ChartScreen} />
        <Drawer.Screen name="Goals" component={GoalsScreen} />
        <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}