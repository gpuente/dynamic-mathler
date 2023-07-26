/* eslint-disable react/no-array-index-key */
import React, { useState, useMemo } from 'react';
import { ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import { Mathler } from 'mathler-core';

import { ActiveRow } from './ActiveRow';
import { CompleteRow } from './CompleteRow';
import { IncompleteRow } from './IncompleteRow';
import { Keyboard, TileGrid } from '../../components';
import { charStatusToTileStatus } from '../../utils';

const MAX_ATTEMPTS = 6;
const EXPRESSION_LENGTH = 6;
const emptyRowValues = [...Array(EXPRESSION_LENGTH)].map(() => '');

const mathler = new Mathler({
  maxAttempts: MAX_ATTEMPTS,
  calculation: '12/2+1',
});

export const GameScreen: React.FC = () => {
  const [attemptValues, setAttemptValues] = useState(emptyRowValues);

  const [activeRow, setActiveRow] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

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
      mathler.registerAttempt(inputExpression);
      setActiveRow(activeRow + 1);
      setActiveIndex(0);
      setAttemptValues(emptyRowValues);
    } catch (error) {
      // TODO: handle error
    }
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

    return (
      <>
        {[...Array(rowsLeft)].map((_, index) => (
          <IncompleteRow key={index} columns={EXPRESSION_LENGTH} />
        ))}
      </>
    );
  }, [activeRow]);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={{ backgroundColor: 'yellow', height: 40 }} />
        <View style={styles.gridSection}>
          <View style={styles.gridContainer}>
            <TileGrid style={styles.grid}>
              {completeRows}
              <ActiveRow
                values={attemptValues}
                activeIndex={activeIndex}
                onPress={(index) => setActiveIndex(index)}
              />
              {incompleteRows}
            </TileGrid>
          </View>
        </View>
        <View style={styles.keyboardSection}>
          <Keyboard
            i18n={{ delete: 'delete', validate: 'validate' }}
            onInput={onInput}
            onDelete={onDelete}
            onValidate={onValidate}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
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
    width: 350,
    height: 420,
  },
  grid: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 5,
  },
});
