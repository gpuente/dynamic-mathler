import Constants from 'expo-constants';
import { registerRootComponent } from 'expo';

import App from './App';
import StorybookUIRoot from '../.storybook';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

let AppEntryPoint = App;

if (Constants.expoConfig?.extra?.STORYBOOK_ENABLED === 'true') {
  AppEntryPoint = StorybookUIRoot;
}

registerRootComponent(AppEntryPoint);
