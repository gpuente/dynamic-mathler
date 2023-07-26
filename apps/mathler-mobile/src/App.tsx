import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { GameScreen } from './screens';
import { ThemeProvider } from './providers/theme';

export default function App() {
  return (
    <ThemeProvider>
      <StatusBar style="auto" />
      <GameScreen />
      <Toast />
    </ThemeProvider>
  );
}
