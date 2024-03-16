import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import { HomeStack } from '../@Types/navigation';
import { SCREEN_NAME } from '../Enum/Screens';
import AddTaskScreen from '../Presentation/Screens/AddTaskScreen/AddTaskScreen';
import HomeScreen from '../Presentation/Screens/HomeScreen/HomeScreen';
import Topbar from '../Presentation/Components/Topbar/Topbar';

interface NavigationProps {
  theme: Theme;
}

const Navigation: React.FC<NavigationProps> = ({ theme }) => {
  return (
    <NavigationContainer theme={theme}>
      <HomeStack.Navigator>
        <HomeStack.Screen
          options={{ header: Topbar }}
          name={SCREEN_NAME.HOME}
          component={HomeScreen}
        />
        <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
          <HomeStack.Screen
            options={{ headerShown: false }}
            name={SCREEN_NAME.ADD_TASK}
            component={AddTaskScreen}
          />
        </HomeStack.Group>
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
