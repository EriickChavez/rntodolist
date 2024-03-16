import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import useTheme from '../../../Hook/useTheme';
import { useDispatch } from 'react-redux';
import TaskSlice from '../../../Store/Slice/TaskSlice';
import { AddTaskScreenNavigationProps } from '../../../@Types/navigation';

const AddTaskScreen: React.FC<AddTaskScreenNavigationProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState(route.params?.task?.title || '');
  const [desc, setDesc] = useState(route.params?.task?.description || '');
  const isValid = useMemo(() => title.length > 0, [title]);
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }
    if (!route.params?.task) {
      dispatch(
        TaskSlice.actions.newTask({
          task: {
            title: title,
            description: desc,
            isChecked: false,
          },
        }),
      );
    } else {
      dispatch(
        TaskSlice.actions.updateTask({
          task: {
            id: route.params.task.id,
            title,
            description: desc,
            isChecked: route.params.task.isChecked,
          },
        }),
      );
    }
    navigation.goBack();
  }, [desc, dispatch, isValid, title, navigation, route.params]);

  const onChangeTitle = (value: string) => {
    setTitle(value);
  };
  const onChangeDesc = (value: string) => {
    setDesc(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Add new Task</Text>
        </View>
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}>
                Title
              </Text>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.danger }]}>
                *
              </Text>
              <Text
                style={[
                  styles.inputLabelCount,
                  { color: theme.colors.subtext },
                ]}>
                (0/100)
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Task"
              placeholderTextColor={'gray'}
              onChangeText={onChangeTitle}
              value={title}
            />
          </View>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, styles.inputContainer]}>
          <View style={styles.textAreaContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}>
                Description
              </Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Task"
              multiline
              onChangeText={onChangeDesc}
              value={desc}
              placeholderTextColor={'gray'}
              returnKeyType="done"
            />
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleCancel}
            style={[
              styles.button,
              styles.buttonCancel,
              {
                borderColor: theme.colors.subtext,
                backgroundColor: theme.colors.background,
              },
            ]}>
            <Text style={[styles.buttonText, { color: theme.colors.subtext }]}>
              Cancelar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            style={[
              styles.button,
              styles.buttonConfirm,
              { backgroundColor: theme.colors.success },
            ]}>
            <Text
              style={[styles.buttonText, { color: theme.colors.background }]}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
