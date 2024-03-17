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
import LocalizationService from '../../../Utils/LocalizationService';
import { MAX_CHARS } from '../../../Constants/Constants';

const AddTaskScreen: React.FC<AddTaskScreenNavigationProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();

  const [title, setTitle] = useState(route.params?.task?.title || '');
  const [desc, setDesc] = useState(route.params?.task?.description || '');
  const isValid = useMemo(() => title.length > 0, [title]);
  const dispatch = useDispatch();

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

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSave = useCallback(() => {
    if (!isValid) {
      Alert.alert(
        LocalizationService.addTask.error.error,
        LocalizationService.addTask.error.title,
      );
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
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}>
                {LocalizationService.addTask.titleInput}
              </Text>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.danger }]}>
                *
              </Text>
              <Text
                style={[
                  styles.inputLabelCount,

                  {
                    color:
                      title.length === MAX_CHARS
                        ? theme.colors.danger
                        : theme.colors.subtext,
                  },
                ]}>
                ({title.length}/{MAX_CHARS})
              </Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder={LocalizationService.addTask.titleInputPlaceholder}
              maxLength={MAX_CHARS}
              placeholderTextColor={'gray'}
              onChangeText={onChangeTitle}
              value={title}
            />
          </View>
        </View>
        <KeyboardAwareScrollView
          disableScrollOnKeyboardHide={true}
          contentContainerStyle={styles.container}>
          <View style={styles.textAreaContainer}>
            <View style={styles.inputLabel}>
              <Text
                style={[styles.inputLabelText, { color: theme.colors.text }]}>
                {LocalizationService.addTask.descriptionInput}
              </Text>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder={
                LocalizationService.addTask.descriptionInputPlaceholder
              }
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
                {LocalizationService.button.cancel}
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
                {LocalizationService.button.save}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddTaskScreen;
