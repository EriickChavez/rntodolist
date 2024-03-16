import { AddCircle } from 'iconsax-react-native';
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles';
import useTheme from '../../../Hook/useTheme';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { SCREEN_NAME } from '../../../Enum/Screens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TopbarProps extends NativeStackHeaderProps {
  taskCount?: number;
  completedTaskCount?: number;
}

const Topbar: React.FC<TopbarProps> = ({
  taskCount = 0,
  completedTaskCount = 0,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const onAddPress = useCallback(() => {
    navigation.navigate(SCREEN_NAME.ADD_TASK);
  }, [navigation]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, paddingTop: insets.top },
      ]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Tasks</Text>
        <TouchableOpacity onPress={onAddPress}>
          <AddCircle size={RFValue(18)} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.taskCount, { color: theme.colors.subtext }]}>
        ({completedTaskCount}/{taskCount}) Completed Tasks
      </Text>
    </View>
  );
};

export default Topbar;
