import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import ConfettiCannon from 'react-native-confetti-cannon';

import { useTheme } from '../../../providers/theme';

export interface CongratsModalProps {
  isVisible?: boolean;
  attempts: number;
  onClose: () => void;
}

export const CongratsModal: React.FC<CongratsModalProps> = (props) => {
  const { isVisible = false, onClose, attempts } = props;

  const { t } = useTranslation();
  const { palette } = useTheme();

  const containerStyles = {
    ...styles.container,
    backgroundColor: palette.modal.background,
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={containerStyles}>
        <View style={styles.messageContainer}>
          <Text style={styles.title}>{t('congratulations.title')}</Text>
          <Text>{t('congratulations.message', { attempts })}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.cta}>
              <Text
                style={{ color: palette.button.primary, fontWeight: 'bold' }}
              >
                {t('startNewGame')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cta: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    paddingTop: 30,
    paddingBottom: 10,
  },
});
