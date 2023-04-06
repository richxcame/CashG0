import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CashesScreen} from '../screens/CashesScreen';
import {RangeScreen} from '../screens/RangeScreen';
import {CashDetailsScreen} from '../screens/CashDetailsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigation';
import {AboutScreen} from '../screens/AboutScreen';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const CashesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cashes" component={CashesScreen} />
      <Stack.Screen name="CashDetails" component={CashDetailsScreen} />
    </Stack.Navigator>
  );
};

export const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{headerShown: false, title: 'Cashes'}}
        name="CashesStack"
        component={CashesStack}
      />
      <Tab.Screen name="Ranges" component={RangeScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
};
