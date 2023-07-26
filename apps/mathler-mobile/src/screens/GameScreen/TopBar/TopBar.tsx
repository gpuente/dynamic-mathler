import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../../providers/theme';

export interface TopBarProps {
  result: number;
  onInfoPress?: () => void;
}

export const TopBar: React.FC<TopBarProps> = (props) => {
  const { result, onInfoPress } = props;

  const { i18n, t } = useTranslation();
  const { palette } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const langButtonStyles = {
    ...styles.button,
    backgroundColor: palette.button.primary,
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onInfoPress}>
          <Text style={styles.iconButton}>ℹ️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLanguage}>
          <View style={langButtonStyles}>
            <Text style={styles.langText}>🌎 {i18n.language}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t('header.title', { result })}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  langText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  iconButton: {
    fontSize: 26,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
