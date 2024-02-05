import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppRegistry, AppState } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';







const AppWrapper = () => {


  return <GestureHandlerRootView style={{ flex: 1 }}>
    <App />
  </GestureHandlerRootView>
};

AppRegistry.registerComponent(appName, () => AppWrapper);
