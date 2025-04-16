import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChartScreen from './screens/ChartScreen';
import GoalsScreen from './screens/GoalsScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import UniversalAdd from './components/UniversalAdd';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPinScreen from './screens/ForgotPinScreen';
import type { StaticParamList } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Chart" component={ChartScreen} />
      <Drawer.Screen name="Goals" component={GoalsScreen} />
      <Drawer.Screen name="Expenses" component={ExpensesScreen} />
      <UniversalAdd />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
          headerShown: false,
        }}>
        {/* Authentication Screens */}
        <Stack.Screen name="SignIn" component={SignUpScreen} />
        <Stack.Screen name="ForgotPin" component={ForgotPinScreen} />

        {/* Main App (Drawer Navigator) */}
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Chart: ChartScreen,
    Goals: GoalsScreen,
    Expenses: ExpensesScreen,
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeTabs,
    SignIn: SignUpScreen,
    ForgotPin: ForgotPinScreen,
  },
  initialRouteName: 'SignIn',

});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}