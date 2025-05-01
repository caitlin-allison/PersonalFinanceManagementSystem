import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import GoalsScreen from './screens/GoalsScreen';
import ExpensesScreen from './screens/BudgetScreen';
import SignUpScreen from './screens/SignUpScreen';
import type { StaticParamList } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignInScreen from './screens/SignInScreen';
import BudgetScreen from './screens/BudgetScreen';
import { Icon } from '@rneui/themed';
import BillsScreen from './screens/BillsScreen';
import AddScreen from './screens/AddScreen';
import { SafeAreaView, View, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';



const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: HomeScreen,
    Goals: GoalsScreen,
    Budget: ExpensesScreen,
    Bills: BillsScreen,
  },
  screenOptions: ({ route }) => ({
    tabBarActiveTintColor: 'tomato',
    tabBarInactiveTintColor: 'gray',
  }),
});

const RootStack = createNativeStackNavigator({
  screens: {
    Main: HomeTabs,
    SignIn: SignInScreen,
    SignUp: SignUpScreen,

  },
  initialRouteName: 'SignIn',

});
function DrawerNavigator() {
  return (
    <HomeTabs.Navigator initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'left',

        headerLeft: () => (
          <SafeAreaProvider style={{ margin: 15, marginRight: 50 }}>
            <SafeAreaView >
              <Image
                style={{
                  width: 50,
                  height: 50,
                }}
                source={require('@/public/logo.png')}
              />
            </SafeAreaView>
          </SafeAreaProvider>
        )
      }}>
      <HomeTabs.Screen name="Home" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (<Icon
            name="home"
            type="material"
          />),
        }}
      />
      <HomeTabs.Screen name="Goals" component={GoalsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (<Icon
            name="savings"
            type="material"
          />)
        }}
      />
      <HomeTabs.Screen name="Add"
        component={AddScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                borderRadius: 50,
                backgroundColor: 'white',
                boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
                justifyContent: 'center', // Ensures content is centered
                alignItems: 'center',
                elevation: 5, // Android shadow
                width: 70, // Ensure the container is large enough to accommodate padding
                height: 70,
              }}
            ><Icon
                name="add"
                type="material"
                style={{
                  zIndex: 1000,
                }}
                size={40}
              />
            </View>
          ),
        }}
      />
      <HomeTabs.Screen name="Budget" component={BudgetScreen}
        options={{
          tabBarIcon: ({ color, size }) => (<Icon
            name="account-balance-wallet"
            type="material"
          />)
        }}
      />
      <HomeTabs.Screen name="Bills" component={BillsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (<Icon
            name="attach-money"
            type="material"
          />)
        }}
      />
      {/* <UniversalAdd /> */}
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
        }}
      >
        {/* Authentication Screens */}
        <RootStack.Screen name="SignIn" component={SignInScreen} />
        <RootStack.Screen name="SignUp" component={SignUpScreen} />

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