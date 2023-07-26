import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../../providers/theme';

export interface DebugModalProps {
  isVisible?: boolean;
  expression: string;
  onClose: () => void;
}

export const DebugModal: React.FC<DebugModalProps> = (props) => {
  const { isVisible = false, onClose, expression } = props;

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
          <Text>{t('debugModal.title', { expression })}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onClose}>
            <View style={styles.cta}>
              <Text
                style={{ color: palette.button.primary, fontWeight: 'bold' }}
              >
                {t('debugModal.close')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
