import { BackHandler } from 'react-native';

const backButtonHandler = () => {
  const backPressCallbacks = [];

  const handleBackButton = () => {
    // Execute all registered callback functions
    backPressCallbacks.forEach((callback) => {
      callback();
    });
    return true; // Prevent default behavior
  };

  const addBackButtonListener = (callback) => {
    backPressCallbacks.push(callback);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  };

  const removeBackButtonListener = (callback) => {
    const index = backPressCallbacks.indexOf(callback);
    if (index !== -1) {
      backPressCallbacks.splice(index, 1);
    }
    if (backPressCallbacks.length === 0) {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    }
  };

  return { addBackButtonListener, removeBackButtonListener };
};

export default backButtonHandler;
