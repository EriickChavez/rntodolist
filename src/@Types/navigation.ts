import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { SCREEN_NAME } from '../Enum/Screens';
import { Task } from './tasks';

export type HomeStackParamList = {
  [SCREEN_NAME.HOME]: undefined;
  [SCREEN_NAME.ADD_TASK]: {
    task?: Task;
  };
};

export const HomeStack = createNativeStackNavigator<HomeStackParamList>();

export type HomeScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  SCREEN_NAME.HOME
>;
export type AddTaskScreenNavigationProps = NativeStackScreenProps<
  HomeStackParamList,
  SCREEN_NAME.ADD_TASK
>;
