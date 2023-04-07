/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {CashesScreen} from '../screens/CashesScreen';
import {RangeScreen} from '../screens/RangeScreen';
import {CashDetailsScreen} from '../screens/CashDetailsScreen';
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
        options={{
          headerShown: false,
          title: 'Cashes',
          tabBarIcon: ({color, size}) => (
            <Icon name="list-outline" color={color} size={size} />
          ),
        }}
        name="CashesStack"
        component={CashesStack}
      />
      <Tab.Screen
        name="Ranges"
        component={RangeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="bar-chart-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="information-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
