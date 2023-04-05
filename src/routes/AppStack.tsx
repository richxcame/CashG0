import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
import {RangeScreen} from '../screens/RangeScreen';

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ranges" component={RangeScreen} />
    </Tab.Navigator>
  );
};
