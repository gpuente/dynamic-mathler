import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../../providers/theme';

export const TopBar: React.FC = () => {
  const { i18n } = useTranslation();
  const { palette } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const langButtonStyles = {
    ...styles.button,
    backgroundColor: palette.button.primary,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleLanguage}>
        <View style={langButtonStyles}>
          <Text style={styles.langText}>🌎 {i18n.language}</Text>
        </View>
      </TouchableOpacity>
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
});
