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

  const headerTitle = useMemo(() => {
    if (route.name === SCREEN_NAME.HOME) {
      return SCREEN_TITLE.HOME;
    }
    if (options.title === SCREEN_TITLE.ADD_TASK) {
      return SCREEN_TITLE.ADD_TASK;
    } else {
      return SCREEN_TITLE.EDIT_TASK;
    }
  }, [route, options.title]);

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
        <TouchableOpacity onPress={onAddPress}>
          <AddCircle size={RFValue(18)} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      {showProgress && (
        <Text
          style={[
            styles.taskCount,
            {
              color:
                completedTaskCount === taskCount
                  ? theme.colors.success
                  : theme.colors.subtext,
            },
          ]}>
          ({completedTaskCount}/{taskCount}) Completed Tasks
        </Text>
      )}
    </View>
  );
};

export default Topbar;
