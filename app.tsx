import HomeScreen from './app/(screens)';
import EditorScreen from './app/(screens)/editor';
import ModifyImageScreen from './app/(screens)/modifyImage';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  


const   
 Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Editor" component={EditorScreen} />
        <Stack.Screen name="Modify" component={ModifyImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default   
 App;