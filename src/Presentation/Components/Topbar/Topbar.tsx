import { AddCircle, ArrowLeft2 } from 'iconsax-react-native';
import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles';
import useTheme from '../../../Hook/useTheme';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SCREEN_NAME, SCREEN_TITLE } from '../../../Enum/Screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { taskSelector } from '../../../Store/Slice/TaskSlice';
import { useSelector } from 'react-redux';
import LocalizationService from '../../../Utils/LocalizationService';

const Topbar: React.FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { taskList } = useSelector(taskSelector);

  const completedTaskCount = useMemo(
    () => taskList.filter(task => task.isChecked).length,
    [taskList],
  );
  const taskCount = useMemo(() => taskList.length, [taskList]);

  const onAddPress = useCallback(() => {
    navigation.navigate(SCREEN_NAME.ADD_TASK);
  }, [navigation]);

  const paddingTop = Platform.OS === 'ios' ? insets.top : insets.top * 2;

  const isHomeScreen = useMemo(() => route.name === SCREEN_NAME.HOME, [route]);

  const headerTitle = useMemo(() => {
    if (isHomeScreen) {
      return LocalizationService.home.titleScreen;
    } else if (options.title === SCREEN_TITLE.ADD_TASK) {
      return LocalizationService.addTask.titleAddScreen;
    } else {
      return LocalizationService.addTask.titleEditScreen;
    }
  }, [options.title, isHomeScreen]);

  const showProgress = useMemo(() => {
    return route.name === SCREEN_NAME.HOME;
  }, [route.name]);

  const renderBackButton = useMemo(() => {
    if (!navigation.canGoBack()) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={navigation.goBack}
        style={styles.backButton}>
        <ArrowLeft2 size={RFValue(18)} color={theme.colors.text} />
      </TouchableOpacity>
    );
  }, [navigation, theme.colors.text]);

  const isTasksCompleted = useMemo(() => {
    return completedTaskCount === taskCount && taskCount > 0;
  }, [completedTaskCount, taskCount]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingTop },
      ]}>
      <View style={styles.row}>
        <View style={styles.row}>
          {renderBackButton}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {headerTitle}
          </Text>
        </View>
        {isHomeScreen && (
          <TouchableOpacity onPress={onAddPress}>
            <AddCircle size={RFValue(18)} color={theme.colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {showProgress && (
        <Text
          style={[
            styles.taskCount,
            {
              color: isTasksCompleted
                ? theme.colors.success
                : theme.colors.subtext,
            },
          ]}>
          ({completedTaskCount}/{taskCount}){' '}
          {LocalizationService.home.completedTasks}
        </Text>
      )}
    </View>
  );
};

export default Topbar;
