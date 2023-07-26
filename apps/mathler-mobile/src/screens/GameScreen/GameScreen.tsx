/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo } from 'react';
import { Mathler, AttemptStatus, GameStatus } from 'mathler-core';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';

import { TopBar } from './TopBar';
import { ActiveRow } from './ActiveRow';
import { DebugModal } from './DebugModal';
import { CompleteRow } from './CompleteRow';
import { useTranslateError } from '../../hooks';
import { IncompleteRow } from './IncompleteRow';
import { CongratsModal } from './CongratsModal';
import { GameOverModal } from './GameOverModal';
import { InstructionsModal } from './InstructionsModal';
import { Keyboard, TileGrid } from '../../components';
import { charStatusToTileStatus } from '../../utils';
import { useTheme } from '../../providers/theme';

const MAX_ATTEMPTS = 6;
const EXPRESSION_LENGTH = 6;
const emptyRowValues = [...Array(EXPRESSION_LENGTH)].map(() => '');

const mathler = new Mathler({
  maxAttempts: MAX_ATTEMPTS,
});

export const GameScreen: React.FC = () => {
  const { t } = useTranslation();
  const translateError = useTranslateError();
  const { palette } = useTheme();

  const [expectedResult, setExpectedResult] = useState(mathler.expectedResult);
  const [attemptValues, setAttemptValues] = useState(emptyRowValues);
  const [activeRow, setActiveRow] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const [showGameOverModal, setGameOverModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showDebugModal, setShowDebugModal] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const onInput = (value: string) => {
    const newValues = [...attemptValues];
    newValues[activeIndex] = value;
    setAttemptValues(newValues);

    if (activeIndex < EXPRESSION_LENGTH - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const onDelete = () => {
    const newValues = [...attemptValues];
    newValues[activeIndex] = '';
    setAttemptValues(newValues);

    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const onValidate = () => {
    const inputExpression = attemptValues.join('');

    try {
      const result = mathler.registerAttempt(inputExpression);
      setActiveRow(activeRow + 1);
      setActiveIndex(0);
      setAttemptValues(emptyRowValues);

      if (result.status === AttemptStatus.Correct) {
        setShowCongratsModal(true);
        setTotalAttempts(mathler.attempts.length);
        return;
      }

      if (mathler.status === GameStatus.GameOver) {
        setGameOverModal(true);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        visibilityTime: 6000,
        topOffset: 60,
        text1: t('errors.ups'),
        text2: translateError(error as Error),
      });
    }
  };

  const restartGame = () => {
    mathler.restart();

    setExpectedResult(mathler.expectedResult);
    setAttemptValues(emptyRowValues);
    setActiveRow(0);
    setActiveIndex(0);
    setTotalAttempts(0);
    setShowCongratsModal(false);
    setGameOverModal(false);
  };

  const completeRows = useMemo(
    () => (
      <>
        {mathler.attempts.map((attempt, index) => (
          <CompleteRow
            key={index}
            values={attempt.result.map((res) => ({
              value: res.value,
              status: charStatusToTileStatus(res.status),
            }))}
          />
        ))}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeRow]
  );

  const incompleteRows = useMemo(() => {
    const rowsLeft = MAX_ATTEMPTS - (activeRow + 1);

    if (rowsLeft < 0) return null;

    return (
      <>
        {[...Array(rowsLeft)].map((_, index) => (
          <IncompleteRow key={index} columns={EXPRESSION_LENGTH} />
        ))}
      </>
    );
  }, [activeRow]);

  return (
    <ScrollView
      style={{ backgroundColor: palette.background }}
      testID="game-screen"
    >
      <SafeAreaView>
        <View style={styles.headerSection}>
          <TopBar
            result={expectedResult}
            onInfoPress={() => setShowInstructionsModal(true)}
            onSecretPress={() => setShowDebugModal(true)}
            restartGame={restartGame}
          />
        </View>
        <View style={styles.gridSection}>
          <View style={styles.gridContainer}>
            <TileGrid style={styles.grid}>
              {completeRows}
              {activeRow < MAX_ATTEMPTS && (
                <ActiveRow
                  values={attemptValues}
                  activeIndex={activeIndex}
                  onPress={(index) => setActiveIndex(index)}
                />
              )}
              {incompleteRows}
            </TileGrid>
          </View>
        </View>
        <View style={styles.keyboardSection}>
          <Keyboard
            i18n={{
              delete: `${t('delete')} 🗑️`,
              validate: `${t('validate')} ✅`,
            }}
            onInput={onInput}
            onDelete={onDelete}
            onValidate={onValidate}
          />
        </View>
        <CongratsModal
          isVisible={showCongratsModal}
          attempts={totalAttempts}
          onClose={restartGame}
        />
        <GameOverModal
          isVisible={showGameOverModal}
          expression={mathler.calculation}
          onClose={restartGame}
        />
        <InstructionsModal
          isVisible={showInstructionsModal}
          onClose={() => setShowInstructionsModal(false)}
        />
        <DebugModal
          isVisible={showDebugModal}
          expression={mathler.calculation}
          onClose={() => setShowDebugModal(false)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'red',
  },
  headerSection: {
    marginTop: 20,
  },
  gridSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  keyboardSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  gridContainer: {
    width: 300,
    height: 350,
  },
  grid: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 5,
  },
});
