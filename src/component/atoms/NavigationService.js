import { CommonActions } from '@react-navigation/native';

let navigator;

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    navigator.dispatch(
        CommonActions.navigate({
            name: routeName,
            params,
        })
    );
}

function replace(routeName, params) {
    navigator.dispatch(
        CommonActions.replace({
            name: routeName,
            params,
        })
    );
}
// Add other navigation functions as needed
export default {
    navigate,
    replace,
    setTopLevelNavigator,
};
