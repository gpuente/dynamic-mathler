import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { useTheme } from '../../../providers/theme';
import { Theme } from '../../../providers/theme/types';
import { useSecretPressTrigger } from '../../../hooks/useSecretPressTrigger';

export interface TopBarProps {
  result: number;
  onInfoPress?: () => void;
  onSecretPress?: () => void;
  restartGame?: () => void;
}

export const TopBar: React.FC<TopBarProps> = (props) => {
  const { result, onInfoPress, onSecretPress, restartGame } = props;

  const { i18n, t } = useTranslation();
  const { palette, theme, toggleTheme } = useTheme();
  const secretTrigger = useSecretPressTrigger(onSecretPress);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const langButtonStyles = {
    ...styles.button,
    backgroundColor: palette.button.primary,
  };

  const titleStyles = {
    ...styles.title,
    color: palette.text,
  };

  return (
    <View testID="top-bar">
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.iconButton}>
            {theme === Theme.Light ? '🌑' : '☀️'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onInfoPress}>
          <Text style={styles.iconButton}>ℹ️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={restartGame}>
          <Text style={styles.iconButton}>🔄</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleLanguage} style={{ marginLeft: 10 }}>
          <View style={langButtonStyles}>
            <Text style={styles.langText}>🌎 {i18n.language}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <TouchableWithoutFeedback onPress={secretTrigger}>
          <Text style={titleStyles}>{t('header.title', { result })}</Text>
        </TouchableWithoutFeedback>
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
    paddingHorizontal: 10,
  },
});
