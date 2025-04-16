import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
    Main: HomeTabs,
    SignIn: SignUpScreen,
    ForgotPin: ForgotPinScreen,
  },
  initialRouteName: 'SignIn',

});
function DrawerNavigator() {
  return (
    <HomeTabs.Navigator initialRouteName="Home">
      <HomeTabs.Screen name="Home" component={HomeScreen} />
      <HomeTabs.Screen name="Chart" component={ChartScreen} />
      <HomeTabs.Screen name="Goals" component={GoalsScreen} />
      <HomeTabs.Screen name="Expenses" component={ExpensesScreen} />
      <UniversalAdd />
    </HomeTabs.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName='SignIn'
        screenOptions={{
          headerShown: false,
        }}>
        {/* Authentication Screens */}
        <RootStack.Screen name="SignIn" component={SignUpScreen} />
        <RootStack.Screen name="ForgotPin" component={ForgotPinScreen} />

        {/* Main App (Drawer Navigator) */}
        <RootStack.Screen name="Main" component={DrawerNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}