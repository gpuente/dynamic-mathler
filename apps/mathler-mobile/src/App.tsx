import './i18n';

import Toast from 'react-native-toast-message';

import { GameScreen } from './screens';
import { StatusBar } from './components/StatusBar';
import { ThemeProvider } from './providers/theme';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar />
      <GameScreen />
      <Toast />
    </ThemeProvider>
  );
}
