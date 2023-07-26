import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardButton } from '../KeyboardButton';

export interface KeyboardProps {
  onInput: (value: string) => void;
  onDelete: () => void;
  onValidate: () => void;
  i18n: {
    validate: string;
    delete: string;
  };
}

export const Keyboard: React.FC<KeyboardProps> = (props) => {
  const { onDelete, onInput, onValidate, i18n } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <KeyboardButton value="1" text="1" onPress={() => onInput('1')} />
        <KeyboardButton value="2" text="2" onPress={() => onInput('2')} />
        <KeyboardButton value="3" text="3" onPress={() => onInput('3')} />
        <KeyboardButton value="4" text="4" onPress={() => onInput('4')} />
        <KeyboardButton value="5" text="5" onPress={() => onInput('5')} />
      </View>
      <View style={styles.row}>
        <KeyboardButton value="6" text="6" onPress={() => onInput('6')} />
        <KeyboardButton value="7" text="7" onPress={() => onInput('7')} />
        <KeyboardButton value="8" text="8" onPress={() => onInput('8')} />
        <KeyboardButton value="9" text="9" onPress={() => onInput('9')} />
        <KeyboardButton value="0" text="0" onPress={() => onInput('0')} />
      </View>
      <View style={styles.row}>
        <KeyboardButton
          text="+"
          value="+"
          style={styles.mdButton}
          onPress={() => onInput('+')}
        />
        <KeyboardButton
          text="-"
          value="-"
          style={styles.mdButton}
          onPress={() => onInput('-')}
        />
        <KeyboardButton
          text="*"
          value="*"
          style={styles.mdButton}
          onPress={() => onInput('*')}
        />
        <KeyboardButton
          text="/"
          value="/"
          style={styles.mdButton}
          onPress={() => onInput('/')}
        />
      </View>
      <View style={styles.row}>
        <KeyboardButton
          value="validate"
          style={styles.lgButton}
          textProps={{ style: styles.lgButtonText }}
          text={i18n.validate}
          onPress={onValidate}
        />
        <KeyboardButton
          value="delete"
          style={styles.lgButton}
          textProps={{ style: styles.lgButtonText }}
          text={i18n.delete}
          onPress={onDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  mdButton: {
    width: 64,
  },
  lgButton: {
    display: 'flex',
    flexGrow: 1,
    width: 140,
  },
  lgButtonText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
