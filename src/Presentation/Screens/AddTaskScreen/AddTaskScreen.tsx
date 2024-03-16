import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import useTheme from '../../../Hook/useTheme';
import { useDispatch } from 'react-redux';
import TaskSlice from '../../../Store/Slice/TaskSlice';
import { AddTaskScreenNavigationProps } from '../../../@Types/navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SCREEN_TITLE } from '../../../Enum/Screens';

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

  useEffect(() => {
    if (route.params?.task) {
      navigation.setOptions({
        title: SCREEN_TITLE.EDIT_TASK,
      });
    } else {
      navigation.setOptions({
        title: SCREEN_TITLE.ADD_TASK,
      });
    }
  }, [navigation, route.params?.task]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
        <KeyboardAwareScrollView
          testID="aware_scroll_view_container"
          disableScrollOnKeyboardHide={true}
          contentContainerStyle={styles.container}>
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
              numberOfLines={100}
              placeholderTextColor={'gray'}
            />
          </View>
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
              <Text
                style={[styles.buttonText, { color: theme.colors.subtext }]}>
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
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
