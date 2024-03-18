import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { LOTTIES } from '../../../Constants/Constants';
import useTheme from '../../../Hook/useTheme';
import LocalizationService from '../../../Utils/LocalizationService';

interface EmptyTaskListProps {}

const EmptyTaskList: React.FC<EmptyTaskListProps> = ({}) => {
  const themes = useTheme();

  return (
    <View>
      <LottieView
        style={styles.lottie}
        autoPlay
        loop
        resizeMode={'contain'}
        source={LOTTIES.EMPTY_LIST}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { color: themes.colors.text }]}>
          {LocalizationService.empty.title}
        </Text>
        <Text style={[styles.subtext, { color: themes.colors.subtext }]}>
          {LocalizationService.empty.subtext}
        </Text>
      </View>
    </View>
  );
};

export default EmptyTaskList;
