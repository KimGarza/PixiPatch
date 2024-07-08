import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={'house'} />
          ),
        }}
      />
      <Tabs.Screen
      name="editor"
      options={{
        title: 'Editor',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={'edit'} />
        ),
      }} 
     />
    </Tabs>
  );
}
