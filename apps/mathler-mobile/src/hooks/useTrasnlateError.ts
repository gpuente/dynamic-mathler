import { useTranslation } from 'react-i18next';

export const useTranslateError = () => {
  const { t } = useTranslation();

  return (error: Error) => {
    if (error.message.includes('Invalid expression length'))
      return t('errors.invalidExpressionLength');

    if (error.message.includes('Invalid expression'))
      return t('errors.invalidExpression');

    if (error.message.includes('Game Over')) return t('errors.gameOverAttempt');
    if (error.message.includes('Finished'))
      return t('errors.gameFinishedAttempt');
    return t('errors.genericError');
  };
};
