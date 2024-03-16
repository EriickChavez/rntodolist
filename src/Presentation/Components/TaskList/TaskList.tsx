import React, { useCallback, useEffect } from 'react';
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import { Task } from '../../../@Types/tasks';
import { TouchableOpacity, View } from 'react-native';
import TaskCard from '../TaskCard/TaskCard';
import styles from './styles';
import EmptyTaskList from '../EmptyTaskList/EmptyTaskList';
import { useDispatch } from 'react-redux';
import TaskSlice from '../../../Store/Slice/TaskSlice';
import { useNavigation } from '@react-navigation/native';
import { SCREEN_NAME } from '../../../Enum/Screens';
import { HomeStackParamList } from '../../../@Types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface TaskListProps {
  data: Task[];
}

const TaskList: React.FC<TaskListProps> = props => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const setDraggableData = useCallback(
    (data: Task[]) => {
      dispatch(TaskSlice.actions.setDraggableData({ data }));
    },
    [dispatch],
  );

  const removeTask = useCallback(
    (id: string) => {
      dispatch(
        TaskSlice.actions.removeTask({
          id: id,
        }),
      );
    },
    [dispatch],
  );

  const onCheckTask = useCallback(
    (task: Task) => {
      dispatch(
        TaskSlice.actions.updateTask({
          task,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    setDraggableData(props.data);
  }, [props.data, setDraggableData]);

  const onTaskPress = useCallback(
    (task: Task) => {
      navigation.navigate(SCREEN_NAME.ADD_TASK, { task });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item, drag, isActive }: RenderItemParams<Task>) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.card}
          onPress={() => onTaskPress(item)}
          disabled={isActive}
          onLongPress={drag}>
          <TaskCard
            task={item}
            onDeleteTask={removeTask}
            onCheckTask={onCheckTask}
          />
        </TouchableOpacity>
      );
    },
    [removeTask, onCheckTask, onTaskPress],
  );

  return (
    <View style={styles.container}>
      <DraggableFlatList
        containerStyle={styles.draggableList}
        data={props.data}
        automaticallyAdjustKeyboardInsets={true}
        keyExtractor={(_, index) => String(index)}
        onDragEnd={({ data }) => setDraggableData(data)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        extraData={[props.data]}
        ListEmptyComponent={EmptyTaskList}
      />
    </View>
  );
};

export default TaskList;
