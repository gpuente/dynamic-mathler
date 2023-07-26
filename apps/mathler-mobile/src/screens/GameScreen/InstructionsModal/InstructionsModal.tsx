/* eslint-disable global-require */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';

import { useTheme } from '../../../providers/theme';

export interface InstructionsModalProps {
  isVisible?: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = (props) => {
  const { isVisible = false, onClose } = props;

  const { t } = useTranslation();
  const { palette } = useTheme();

  const containerStyles = {
    ...styles.container,
    backgroundColor: palette.modal.background,
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={containerStyles}>
        <View style={styles.closeContainer}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButtonText}>❌</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={{ maxHeight: 400 }}>
          <View style={styles.messageContainer}>
            <Text style={styles.title}>{t('instructions.title')}</Text>
            <Text>{t('instructions.p1')}</Text>
            <Text style={styles.subtitle}>{t('instructions.p2')}</Text>
            <Text>{t('instructions.p3')}</Text>
            <Image
              source={require('../../../../assets/images/row-example.png')}
              style={{ width: 300, height: 50, marginVertical: 10 }}
            />
            <Text style={styles.subtitle}>{t('instructions.p4')}</Text>
            <Text>{t('instructions.p5')}</Text>
            <Text style={styles.subtitle}>{t('instructions.p6')}</Text>
            <Image
              source={require('../../../../assets/images/game-example.png')}
              style={{ width: 300, height: 350, marginVertical: 10 }}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  messageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
  closeContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 4,
  },
});
