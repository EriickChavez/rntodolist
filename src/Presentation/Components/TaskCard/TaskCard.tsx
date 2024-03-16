import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { TickSquare, Trash, MinusSquare } from 'iconsax-react-native';
import { Task } from '../../../@Types/tasks';
import useTheme from '../../../Hook/useTheme';
import { hexToRgba } from '../../../Utils/ColorUtils';
import { RFValue } from 'react-native-responsive-fontsize';

interface TaskCardProps {
  task: Task;
  onDeleteTask: (id: string) => void;
  onCheckTask: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDeleteTask = () => {},
  onCheckTask = () => {},
}) => {
  const changeStatus = () => {
    const taskUpdated: Task = { ...task, isChecked: !task.isChecked };
    onCheckTask(taskUpdated);
  };

  const deleteTask = useCallback(() => {
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => onDeleteTask(task.id),
        style: 'default',
      },
    ]);
  }, [task, onDeleteTask]);

  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        task.isChecked ? styles.shadowsSuccess : styles.shadows,
        {
          backgroundColor: theme.colors.background,
        },
      ]}>
      <View
        style={[
          styles.indicator,
          {
            backgroundColor: task.isChecked
              ? theme.colors.success
              : theme.colors.info,
          },
        ]}
      />
      <View style={styles.row}>
        <TouchableOpacity
          onPress={changeStatus}
          style={styles.buttonTick}
          activeOpacity={0.8}>
          {task.isChecked ? (
            <TickSquare color={theme.colors.success} size={RFValue(16)} />
          ) : (
            <MinusSquare color={theme.colors.info} size={RFValue(16)} />
          )}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text
            style={[
              styles.title,
              {
                color: task.isChecked
                  ? theme.colors.subtext
                  : theme.colors.text,
              },
              task.isChecked && styles.textChecked,
            ]}
            numberOfLines={1}>
            {task.title}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={deleteTask}
        style={[
          styles.trashContainer,
          { backgroundColor: hexToRgba(theme.colors.light_error, 0.3) },
        ]}>
        <Trash color={theme.colors.light_error} size={RFValue(16)} />
      </TouchableOpacity>
    </View>
  );
};

export default TaskCard;
