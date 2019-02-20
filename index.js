import { AppRegistry } from 'react-native';
import Root from './src/Application';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Root);