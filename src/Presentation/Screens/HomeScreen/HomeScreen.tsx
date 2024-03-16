import React from 'react';
import { View, SafeAreaView } from 'react-native';
import styles from './styles';
import useTheme from '../../../Hook/useTheme';
import { HomeScreenNavigationProps } from '../../../@Types/navigation';
import TaskList from '../../Components/TaskList/TaskList';
import { useSelector } from 'react-redux';
import { taskSelector } from '../../../Store/Slice/TaskSlice';

const HomeScreen: React.FC<HomeScreenNavigationProps> = ({}) => {
  const { taskList } = useSelector(taskSelector);
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <View style={styles.list}>
          <TaskList data={taskList} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
